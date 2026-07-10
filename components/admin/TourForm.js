'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import { COUNTRY_OPTIONS, PROVINCE_OPTIONS, AIRLINE_OPTIONS } from '@/lib/admin-data';

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

const durationPresets = [
  '1 Day', '2 Days 1 Night', '3 Days 2 Nights', '4 Days 3 Nights',
  '5 Days 4 Nights', '6 Days 5 Nights', '7 Days 6 Nights',
];

export default function TourForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    type: '',
    status: 'draft',
    featured: false,
    sort_order: 0,
    country: '',
    province: '',
    price: '',
    duration: '',
    title_th: '',
    title_en: '',
    description_th: '',
    description_en: '',
    transport_info: '[]',
    image: null,
    badge: '',
    airline: '',
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [customDuration, setCustomDuration] = useState(
    initialData && !durationPresets.includes(initialData.duration) ? initialData.duration : ''
  );

  const isOutbound = form.type === 'outbound';

  const countryOpts = useMemo(
    () => [{ value: '', label: 'Select country...' }, ...COUNTRY_OPTIONS],
    []
  );

  const provinceOpts = useMemo(
    () => [{ value: '', label: 'Select province...' }, ...PROVINCE_OPTIONS],
    []
  );

  const airlineOpts = useMemo(
    () => [{ value: '', label: 'Select airline...' }, ...AIRLINE_OPTIONS],
    []
  );

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleDurationPreset = (val) => {
    setCustomDuration('');
    handleChange('duration', val);
  };

  const handleCustomDuration = (val) => {
    setCustomDuration(val);
    handleChange('duration', val);
  };

  const addTransportRow = () => {
    const current = safeParseTransport(form.transport_info);
    current.push({ mode: 'flight', description: '', description_en: '' });
    handleChange('transport_info', JSON.stringify(current));
  };

  const removeTransportRow = (idx) => {
    const current = safeParseTransport(form.transport_info);
    current.splice(idx, 1);
    handleChange('transport_info', JSON.stringify(current));
  };

  const updateTransportRow = (idx, field, value) => {
    const current = safeParseTransport(form.transport_info);
    current[idx][field] = value;
    handleChange('transport_info', JSON.stringify(current));
  };

  const safeParseTransport = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'object' && val !== null) return [val];
    if (typeof val !== 'string') return [];
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const handleBadgeToggle = (badge) => {
    const badges = form.badge ? form.badge.split(',').filter(Boolean) : [];
    const idx = badges.indexOf(badge);
    if (idx === -1) {
      badges.push(badge);
    } else {
      badges.splice(idx, 1);
    }
    handleChange('badge', badges.join(','));
  };

  const validate = () => {
    const errs = {};
    if (!form.title_th) errs.title_th = 'Required';
    if (!form.title_en) errs.title_en = 'Required';
    if (!form.type) errs.type = 'Required';
    if (!form.price || isNaN(Number(form.price))) errs.price = 'Valid price required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      price: Number(form.price),
      sort_order: Number(form.sort_order),
    };
    onSubmit(payload);
  };

  const transportRows = useMemo(() => safeParseTransport(form.transport_info), [form.transport_info]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
            <div className="flex gap-4">
              {['domestic', 'outbound'].map((t) => (
                <label
                  key={t}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    form.type === t
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={form.type === t}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="sr-only"
                  />
                  {t === 'domestic' ? 'Domestic' : 'Outbound'}
                </label>
              ))}
            </div>
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
          </div>
          <Select
            label="Status"
            options={statusOptions}
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
          <Input
            label="Sort Order"
            type="number"
            value={form.sort_order}
            onChange={(e) => handleChange('sort_order', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Location</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {isOutbound ? (
            <Select
              label="Country"
              options={countryOpts}
              value={form.country}
              onChange={(e) => handleChange('country', e.target.value)}
            />
          ) : (
            <Input
              label="Country"
              value={form.country}
              onChange={(e) => handleChange('country', e.target.value)}
            />
          )}
          {!isOutbound ? (
            <Select
              label="Province"
              options={provinceOpts}
              value={form.province}
              onChange={(e) => handleChange('province', e.target.value)}
            />
          ) : (
            <Input
              label="Province"
              value={form.province}
              onChange={(e) => handleChange('province', e.target.value)}
            />
          )}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Pricing & Duration</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Price (THB)"
            type="number"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            error={errors.price}
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Duration</label>
            <div className="flex flex-wrap gap-2">
              {durationPresets.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDurationPreset(d)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    form.duration === d && !customDuration
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Custom duration..."
              value={customDuration}
              onChange={(e) => handleCustomDuration(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Description</h2>
        <div className="grid gap-4">
          <Textarea
            label="Description (TH)"
            rows={4}
            value={form.description_th}
            onChange={(e) => handleChange('description_th', e.target.value)}
            error={errors.description_th}
          />
          <Textarea
            label="Description (EN)"
            rows={4}
            value={form.description_en}
            onChange={(e) => handleChange('description_en', e.target.value)}
            error={errors.description_en}
          />
        </div>
      </Card>

      {isOutbound && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Airline</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Airline"
              options={airlineOpts}
              value={form.airline}
              onChange={(e) => handleChange('airline', e.target.value)}
            />
            {form.airline && (
              <div className="flex items-end pb-1">
                <img
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${form.airline}`}
                  alt="Airline logo"
                  className="max-h-10 rounded object-contain"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            )}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Transport</h2>
        <div className="space-y-3">
          {transportRows.map((row, idx) => (
            <div key={idx} className="flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 p-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-gray-500">Mode</label>
                <select
                  value={row.mode || 'flight'}
                  onChange={(e) => updateTransportRow(idx, 'mode', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="flight">Flight</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="ferry">Ferry</option>
                  <option value="car">Car</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex-[2]">
                <label className="mb-1 block text-xs font-medium text-gray-500">Description (TH)</label>
                <input
                  value={row.description || ''}
                  onChange={(e) => updateTransportRow(idx, 'description', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex-[2]">
                <label className="mb-1 block text-xs font-medium text-gray-500">Description (EN)</label>
                <input
                  value={row.description_en || ''}
                  onChange={(e) => updateTransportRow(idx, 'description_en', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTransportRow(idx)}
                className="rounded-md bg-red-50 p-2 text-red-500 hover:bg-red-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTransportRow}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            + Add transport leg
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Image</h2>
        <ImageUploader
          value={form.image}
          onChange={(val) => handleChange('image', val)}
        />
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Badge</h2>
        <div className="flex flex-wrap gap-4">
          {['hot', 'monthly'].map((b) => {
            const badges = form.badge ? form.badge.split(',').filter(Boolean) : [];
            const isActive = badges.includes(b);
            return (
              <label
                key={b}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleBadgeToggle(b)}
                  className="sr-only"
                />
                {b === 'hot' ? '🔥 Hot' : '📅 Monthly Pick'}
              </label>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" loading={loading}>
          {initialData ? 'Update Tour' : 'Create Tour'}
        </Button>
      </div>
    </form>
  );
}
