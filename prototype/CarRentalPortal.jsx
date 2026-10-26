import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Icon({ name, className = "h-5 w-5" }) {
  const icons = {
    search: "⌕",
    map: "⌖",
    calendar: "◷",
    sliders: "☷",
    heart: "♡",
    user: "◉",
    shield: "◆",
    login: "↪",
    car: "▰",
    chart: "▥",
    close: "×",
    check: "✓",
    settings: "⚙",
    users: "◎",
    building: "▣",
    lock: "●",
    mail: "✉",
    phone: "☎",
    external: "↗",
  };

  return (
    <span
      aria-hidden="true"
      className={`${className} inline-flex shrink-0 items-center justify-center font-bold leading-none`}
    >
      {icons[name] || "•"}
    </span>
  );
}

const cars = [
  {
    id: 1,
    title: "Toyota Camry",
    className: "Комфорт",
    body: "SEDAN",
    transmission: "Автомат",
    fuel: "Бензин",
    seats: 5,
    zone: "Северный район",
    partner: "DrivePartner North",
    price: 4200,
    available: "Сегодня — 18 фев",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1600&auto=format&fit=crop",
    specs: ["181 л.с.", "5 мест", "Бензин", "Автомат"],
  },
  {
    id: 2,
    title: "Geely Coolray",
    className: "Внедорожник",
    body: "SUV",
    transmission: "Автомат",
    fuel: "Бензин",
    seats: 5,
    zone: "Восточный район",
    partner: "East Rent",
    price: 5100,
    available: "Завтра — 21 фев",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600&auto=format&fit=crop",
    specs: ["150 л.с.", "SUV", "5 мест", "Автомат"],
  },
  {
    id: 3,
    title: "BMW 5 Series",
    className: "Бизнес",
    body: "SEDAN",
    transmission: "Автомат",
    fuel: "Дизель",
    seats: 5,
    zone: "Юго-западный район",
    partner: "Premium Auto",
    price: 8900,
    available: "18 фев — 24 фев",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop",
    specs: ["249 л.с.", "Бизнес", "Дизель", "Автомат"],
  },
];

function runSmokeTests() {
  const results = [];
  results.push({ name: "catalog has cars", pass: cars.length === 3 });
  results.push({ name: "prices are positive", pass: cars.every((car) => car.price > 0) });
  results.push({ name: "car ids are unique", pass: new Set(cars.map((car) => car.id)).size === cars.length });
  return results;
}

function Field({ icon, label, value, wide = false, type = "text" }) {
  return (
    <label className={`rounded-2xl border bg-white/90 px-4 py-3 shadow-sm ${wide ? "lg:col-span-2" : ""}`}>
      <span className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <Icon name={icon} className="h-4 w-4" /> {label}
      </span>
      <input type={type} className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none" defaultValue={value} />
    </label>
  );
}

function AuthModal({ mode, setMode, onClose }) {
  const isRegister = mode === "register";
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">Личный кабинет</p>
            <h2 className="text-2xl font-bold text-slate-950">{isRegister ? "Регистрация клиента" : "Авторизация"}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {isRegister
                ? "Заполните данные для доступа к избранному, истории и переходам к партнёрам."
                : "Войдите, чтобы перейти к оформлению у партнёра и управлять профилем."}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Закрыть">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-3">
          {isRegister && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field icon="user" label="Фамилия" value="Иванов" />
              <Field icon="user" label="Имя" value="Иван" />
              <Field icon="user" label="Отчество" value="Иванович" />
              <Field icon="calendar" label="Дата рождения" value="1999-04-12" type="date" />
              <Field icon="phone" label="Телефон" value="+7 (999) 123-45-67" />
              <Field icon="mail" label="Email" value="ivan@example.ru" type="email" />
            </div>
          )}
          {!isRegister && <Field icon="mail" label="Email" value="ivan@example.ru" type="email" />}
          <Field icon="lock" label="Пароль" value="Qwerty123!" type="password" />
          {isRegister && <Field icon="lock" label="Подтверждение пароля" value="Qwerty123!" type="password" />}
          {isRegister && (
            <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <label className="flex gap-2"><input type="checkbox" defaultChecked /> Согласен с офертой</label>
              <label className="flex gap-2"><input type="checkbox" defaultChecked /> Согласен на обработку персональных данных</label>
            </div>
          )}
          <Button className="h-12 rounded-2xl text-base">{isRegister ? "Зарегистрироваться" : "Войти"}</Button>
          <button onClick={() => setMode(isRegister ? "login" : "register")} className="text-sm font-semibold text-blue-600">
            {isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CarCard({ car, onDetails }) {
  return (
    <Card className="overflow-hidden rounded-[1.75rem] border-0 shadow-lg shadow-slate-200/70">
      <div className="relative h-48 overflow-hidden">
        <img src={car.image} alt={car.title} className="h-full w-full object-cover" />
        <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow" aria-label="Добавить в избранное">
          <Icon name="heart" className="h-5 w-5" />
        </button>
        <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white">{car.className}</span>
      </div>
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-950">{car.title}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><Icon name="map" className="h-4 w-4" /> {car.zone}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-slate-950">{car.price.toLocaleString("ru-RU")} ₽</p>
            <p className="text-xs text-slate-500">за сутки</p>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {car.specs.map((spec) => <span key={spec} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{spec}</span>)}
        </div>
        <div className="mb-4 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">
          <Icon name="check" className="mr-2 inline h-4 w-4" /> Доступен: {car.available}
        </div>
        <Button onClick={() => onDetails(car)} className="w-full rounded-2xl">Подробнее</Button>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <section id="cabinet" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Клиентский кабинет</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Профиль, история и избранное</h2>
        </div>
        <Button variant="outline" className="rounded-2xl"><Icon name="settings" className="mr-2 h-4 w-4" /> Настройки</Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-[1.75rem] border-0 shadow-lg">
          <CardContent className="p-6">
            <Icon name="user" className="mb-4 h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold">Иван Иванов</h3>
            <p className="mt-2 text-sm text-slate-500">ivan@example.ru<br />+7 (999) 123-45-67</p>
            <Button className="mt-5 rounded-2xl" variant="outline">Редактировать данные</Button>
          </CardContent>
        </Card>
        <Card className="rounded-[1.75rem] border-0 shadow-lg lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="mb-4 text-xl font-bold">История активности</h3>
            {["Toyota Camry — переход к DrivePartner North", "BMW 5 Series — просмотр карточки", "Поиск: Комфорт, Северный район, до 5000 ₽"].map((item, index) => (
              <div key={item} className="flex items-center justify-between border-b py-3 last:border-0">
                <span className="text-sm text-slate-700">{item}</span>
                <span className="text-xs text-slate-400">{index + 12}.02.2026</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function SmokeTests() {
  const tests = runSmokeTests();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="rounded-[2rem] border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">Smoke tests</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {tests.map((test) => (
            <div key={test.name} className={`rounded-2xl p-3 text-sm ${test.pass ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
              {test.pass ? "✓" : "×"} {test.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CarRentalPortalDesign() {
  const [authMode, setAuthMode] = useState(null);
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [showNotice, setShowNotice] = useState(false);
  const filteredCars = useMemo(() => cars, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white"><Icon name="car" className="h-6 w-6" /></div>
            <div><p className="text-lg font-black">MoscowAuto</p><p className="text-xs text-slate-500">агрегатор аренды</p></div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#catalog">Каталог</a><a href="#cabinet">Кабинет</a>
          </nav>
          <div className="flex gap-2">
            <Button onClick={() => setAuthMode("login")} variant="outline" className="rounded-2xl"><Icon name="login" className="mr-2 h-4 w-4" />Войти</Button>
            <Button onClick={() => setAuthMode("register")} className="rounded-2xl">Регистрация</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <p className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">Москва · Север · Юго-запад · Восток</p>
                <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 md:text-7xl">Найдите автомобиль у проверенных партнёров</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Портал сравнивает предложения арендодателей, показывает доступность, цену и характеристики, а оформление завершает на сайте партнёра.</p>
              </motion.div>

              <div className="mt-8 grid gap-3 rounded-[2rem] bg-white p-3 shadow-2xl shadow-blue-100 lg:grid-cols-4">
                <Field icon="map" label="Район" value="Северный" />
                <Field icon="calendar" label="Начало" value="2026-02-14" type="date" />
                <Field icon="calendar" label="Окончание" value="2026-02-18" type="date" />
                <label className="rounded-2xl border bg-white px-4 py-3 shadow-sm">
                  <span className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500"><Icon name="sliders" className="h-4 w-4" /> Класс</span>
                  <select className="w-full bg-transparent text-sm font-semibold outline-none" defaultValue="Комфорт">
                    <option>Комфорт</option><option>Эконом</option><option>Бизнес</option><option>Внедорожник</option>
                  </select>
                </label>
                <Button className="h-14 rounded-2xl lg:col-span-4"><Icon name="search" className="mr-2 h-5 w-5" />Найти автомобили</Button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop" alt="Автомобиль" className="h-[560px] w-full rounded-[2.5rem] object-cover shadow-2xl" />
              <div className="absolute bottom-6 left-6 right-6 rounded-[1.75rem] bg-white/90 p-5 shadow-xl backdrop-blur">
                <p className="text-sm text-slate-500">Лучшее совпадение</p>
                <p className="text-2xl font-black">Toyota Camry · 4 200 ₽/сутки</p>
                <p className="mt-1 text-sm text-slate-600">Рядом с вами · доступна на выбранные даты</p>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Каталог</p><h2 className="mt-2 text-3xl font-bold text-slate-950">Доступные автомобили</h2></div>
            <Button variant="outline" className="rounded-2xl"><Icon name="sliders" className="mr-2 h-4 w-4" /> Фильтры: цена, кузов, топливо, места</Button>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">{filteredCars.map((car) => <CarCard key={car.id} car={car} onDetails={setSelectedCar} />)}</div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="grid gap-6 rounded-[2.5rem] bg-white p-5 shadow-xl lg:grid-cols-[1fr_1.1fr]">
            <img src={selectedCar.image} alt={selectedCar.title} className="h-full min-h-[380px] rounded-[2rem] object-cover" />
            <div className="p-3 md:p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Детальная страница</p>
              <h2 className="mt-2 text-4xl font-black">{selectedCar.title}</h2>
              <p className="mt-4 text-slate-600">Технические характеристики, фотографии, стоимость, доступные даты и информация о партнёре-арендодателе.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[["Класс", selectedCar.className], ["Кузов", selectedCar.body], ["Топливо", selectedCar.fuel], ["Партнёр", selectedCar.partner]].map(([key, value]) => (
                  <div key={key} className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">{key}</p><p className="font-bold">{value}</p></div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Оформление договора и оплата выполняются на сайте партнёра. Портал фиксирует переход и выступает агрегатором предложений.</div>
              <Button onClick={() => setShowNotice(true)} className="mt-6 h-12 rounded-2xl"><Icon name="external" className="mr-2 h-4 w-4" /> Перейти к оформлению</Button>
            </div>
          </div>
        </section>

        <Dashboard />
        <SmokeTests />
      </main>

      <footer className="border-t bg-white py-8 text-center text-sm text-slate-500">MoscowAuto © 2026 · OpenID Connect · Kafka events · 24/7 service</footer>

      {authMode && <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} />}
      {showNotice && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-100 text-blue-600"><Icon name="shield" className="h-7 w-7" /></div>
            <h3 className="text-2xl font-black">Вы переходите на сайт партнёра</h3>
            <p className="mt-3 text-slate-600">Оформление аренды и оплата будут выполнены на стороне партнёра-арендодателя. Портал сохранит запись перехода в истории активности.</p>
            <div className="mt-6 flex gap-3">
              <Button className="rounded-2xl"><Icon name="external" className="mr-2 h-4 w-4" /> Продолжить</Button>
              <Button onClick={() => setShowNotice(false)} variant="outline" className="rounded-2xl">Отмена</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
