'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import type { Personal } from '@/types/portfolio';

// Máscara para telefone brasileiro (fixo ou celular)
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits[2] === '9') {
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return true;
  if (digits.length === 11 && digits[2] === '9') return true;
  if (digits.length === 10 && digits[2] !== '9') return true;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

interface ContactProps {
  personal: Personal;
}

export function Contact({ personal }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 4000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value.replace(/\D/g, '').slice(0, 11)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!email) newErrors.email = 'E-mail é obrigatório';
    else if (!isValidEmail(email)) newErrors.email = 'Informe um e-mail válido';
    if (phone && !isValidPhone(phone)) newErrors.phone = 'Telefone inválido';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('sending');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: name,
          'e-mail': email,
          mensagem: message || '(sem mensagem)',
          telefone: phone || undefined,
          _subject: 'Contato pelo Portfólio',
          _replyto: email,
          _captcha: 'false',
        }),
      });
      await res.json();
      if (res.ok) {
        form.reset();
        setPhone('');
        setShowSuccess(true);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 px-6 w-full mt-10 bg-slate-900/40 border-t border-white/5 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            Entre em Contato
          </h2>
          <p className="text-slate-400">
            Tem algum projeto em mente ou oportunidade de negócio?
            <br /> Me mande uma mensagem através do formulário abaixo!
          </p>
        </div>

        {status === 'error' ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 sm:p-8 rounded-2xl text-center max-w-md mx-auto">
            <p className="text-sm sm:text-base mb-4">Falha ao enviar. Tente novamente.</p>
            <button
              onClick={() => setStatus('idle')}
              className="text-sm text-red-300 hover:text-white underline underline-offset-4"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0a0a0a]/50 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5 max-w-md mx-auto sm:max-w-xl"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                Seu Nome <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600 ${
                  errors.name ? 'border-red-500/50' : 'border-slate-700'
                }`}
                placeholder="João da Silva"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Mail className="text-sky-500 w-4 h-4" /> E-mail <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Informe um e-mail válido"
                className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600 ${
                  errors.email ? 'border-red-500/50' : 'border-slate-700'
                }`}
                placeholder="joao@empresa.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2">
                <Phone className="inline w-4 h-4 mr-1" /> Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={16}
                className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder:text-slate-600 ${
                  errors.phone ? 'border-red-500/50' : 'border-slate-700'
                }`}
                placeholder="(11) 98765-4321 ou (11) 3456-7890"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all resize-none placeholder:text-slate-600"
                placeholder="Como posso te ajudar hoje?"
              />
              {showSuccess && (
                <p className="mt-3 px-4 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl">
                  Enviado com sucesso!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-sky-500 text-white rounded-xl px-4 py-4 font-bold text-base sm:text-lg hover:bg-sky-400 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'sending' ? 'Enviando...' : <>Enviar <Send className="w-5 h-5" /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
