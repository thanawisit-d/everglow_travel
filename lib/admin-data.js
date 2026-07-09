import { countryNameMap, provinceNameMap } from './i18n'

const THAI_RE = /[\u0E00-\u0E7F]/

export const COUNTRY_OPTIONS = Object.keys(countryNameMap)
  .filter(k => THAI_RE.test(k))
  .map(k => ({ value: k, label: k }))
  .sort((a, b) => a.value.localeCompare(b.value, 'th'))

export const PROVINCE_OPTIONS = Object.keys(provinceNameMap)
  .filter(k => THAI_RE.test(k))
  .map(k => ({ value: k, label: k }))
  .sort((a, b) => a.value.localeCompare(b.value, 'th'))

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
]

export const AIRLINE_OPTIONS = [
  { value: 'assets/images/airlines/9Air.png', label: '9Air' },
  { value: 'assets/images/airlines/airasia.png', label: 'Air Asia' },
  { value: 'assets/images/airlines/AirIndia.png', label: 'Air India' },
  { value: 'assets/images/airlines/ANA.avif', label: 'ANA' },
  { value: 'assets/images/airlines/AsianaAirlines.png', label: 'Asiana Airlines' },
  { value: 'assets/images/airlines/BhutanAirlines.png', label: 'Bhutan Airlines' },
  { value: 'assets/images/airlines/Cathaylogo.jpg', label: 'Cathay Pacific' },
  { value: 'assets/images/airlines/CebuPacific.png', label: 'Cebu Pacific' },
  { value: 'assets/images/airlines/ChinaEastern.png', label: 'China Eastern' },
  { value: 'assets/images/airlines/Condor.png', label: 'Condor' },
  { value: 'assets/images/airlines/Emirates.png', label: 'Emirates' },
  { value: 'assets/images/airlines/EtihadAirways.png', label: 'Etihad Airways' },
  { value: 'assets/images/airlines/HongKongAirlines.svg', label: 'Hong Kong Airlines' },
  { value: 'assets/images/airlines/ITAAirways.png', label: 'ITA Airways' },
  { value: 'assets/images/airlines/JejuAir.png', label: 'Jeju Air' },
  { value: 'assets/images/airlines/MyanmarNationalAirlines.png', label: 'Myanmar National Airlines' },
  { value: 'assets/images/airlines/OmanAir.png', label: 'Oman Air' },
  { value: 'assets/images/airlines/PhilippineAirlines.png', label: 'Philippine Airlines' },
  { value: 'assets/images/airlines/Qantas.png', label: 'Qantas' },
  { value: 'assets/images/airlines/QatarAirways.png', label: 'Qatar Airways' },
  { value: 'assets/images/airlines/RoyalJordanian.png', label: 'Royal Jordanian' },
  { value: 'assets/images/airlines/ShandongAirlines.png', label: 'Shandong Airlines' },
  { value: 'assets/images/airlines/SichuanAirlines.png', label: 'Sichuan Airlines' },
  { value: 'assets/images/airlines/SingaporeAirlines.png', label: 'Singapore Airlines' },
  { value: 'assets/images/airlines/spring.png', label: 'Spring Airlines' },
  { value: 'assets/images/airlines/ThaiAirways.png', label: 'Thai Airways' },
  { value: 'assets/images/airlines/ThaiLionAir.png', label: 'Thai Lion Air' },
  { value: 'assets/images/airlines/TurkishAirlines.svg', label: 'Turkish Airlines' },
  { value: 'assets/images/airlines/VietJet.png', label: 'VietJet' },
  { value: 'assets/images/airlines/VietnamAirlines.png', label: 'Vietnam Airlines' },
]
