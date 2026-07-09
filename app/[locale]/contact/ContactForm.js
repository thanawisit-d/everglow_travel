'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function ContactForm({ locale }) {
  const t = (th, en) => locale === 'th' ? th : en;
  const supabase = createClient();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t('กรุณากรอกชื่อ', 'Name is required');
    if (!form.email.trim()) errs.email = t('กรุณากรอกอีเมล', 'Email is required');
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = t('กรุณากรอกอีเมลที่ถูกต้อง', 'Please enter a valid email');
    if (!form.message.trim()) errs.message = t('กรุณากรอกข้อความ', 'Message is required');
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label={t('ชื่อ', 'Name')}
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder={t('กรุณากรอกชื่อ', 'Your name')}
        required
      />
      <Input
        label={t('อีเมล', 'Email')}
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
        required
      />
      <Input
        label={t('เบอร์โทรศัพท์', 'Phone Number')}
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder={t('เบอร์โทร (ไม่จำเป็น)', 'Phone (optional)')}
      />
      <Textarea
        label={t('ข้อความ', 'Message')}
        name="message"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        rows={5}
        placeholder={t('กรุณากรอกข้อความ', 'Your message')}
        required
      />

      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
          {t(
            'ขอบคุณ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว เราจะตอบกลับโดยเร็วที่สุด',
            'Thank you! Your message has been sent. We will get back to you shortly.'
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          {t(
            'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง',
            'An error occurred. Please try again.'
          )}
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} className="w-full sm:w-auto">
        {t('ส่งข้อความ', 'Send Message')}
      </Button>
    </form>
  );
}
