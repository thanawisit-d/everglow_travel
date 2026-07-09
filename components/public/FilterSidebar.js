'use client';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function FilterSidebar({ filters, onChange, onReset, provinces, locale }) {
  const t = (th, en) => locale === 'th' ? th : en;

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{t('ตัวกรอง', 'Filters')}</h3>
        <button onClick={onReset} className="text-sm text-emerald-600 hover:text-emerald-700">
          {t('รีเซ็ต', 'Reset')}
        </button>
      </div>

      {provinces && provinces.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('สถานที่', 'Location')}
          </label>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {provinces.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.locations || []).includes(item)}
                  onChange={() => {
                    const current = filters.locations || [];
                    const updated = current.includes(item)
                      ? current.filter((p) => p !== item)
                      : [...current, item];
                    handleChange('locations', updated);
                  }}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('ราคาต่ำสุด', 'Min Price')}
        </label>
        <Input
          type="number"
          min="0"
          placeholder="0"
          value={filters.priceMin ?? ''}
          onChange={(e) => handleChange('priceMin', e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('ราคาสูงสุด', 'Max Price')}
        </label>
        <Input
          type="number"
          min="0"
          placeholder="100000"
          value={filters.priceMax ?? ''}
          onChange={(e) => handleChange('priceMax', e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('ระยะเวลา', 'Duration')}
        </label>
        <select
          value={filters.duration || ''}
          onChange={(e) => handleChange('duration', e.target.value || null)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">{t('ทั้งหมด', 'All')}</option>
          <option value="1-3">1-3 {t('วัน', 'days')}</option>
          <option value="4-7">4-7 {t('วัน', 'days')}</option>
          <option value="8-14">8-14 {t('วัน', 'days')}</option>
          <option value="15+">15+ {t('วัน', 'days')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('เรียงตาม', 'Sort By')}
        </label>
        <select
          value={filters.sort || ''}
          onChange={(e) => handleChange('sort', e.target.value || null)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">{t('ค่าเริ่มต้น', 'Default')}</option>
          <option value="price_asc">{t('ราคาต่ำไปสูง', 'Price: Low to High')}</option>
          <option value="price_desc">{t('ราคาสูงไปต่ำ', 'Price: High to Low')}</option>
          <option value="duration_asc">{t('ระยะเวลาน้อยไปมาก', 'Duration: Short to Long')}</option>
          <option value="duration_desc">{t('ระยะเวลามากไปน้อย', 'Duration: Long to Short')}</option>
        </select>
      </div>

      <Button className="w-full" onClick={() => onChange(filters)}>
        {t('ค้นหา', 'Search')}
      </Button>
    </div>
  );
}
