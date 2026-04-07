'use client';

import { useTranslations } from "next-intl";
import { MapPin, Clock, Phone, Car } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { gtmEvent } from "../../lib/gtm";

export function ContactBlock() {
  const t = useTranslations("Contact");

  const hours = ["mon_thu", "fri", "sat"];

  return (
    <section className="pt-12 pb-24 sm:pt-16 sm:pb-32 lg:pt-20 lg:pb-40 px-6 sm:px-8 lg:px-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-primary mb-6">
            {t("block.title")}
          </h2>
          <p className="font-body text-lg sm:text-xl text-on-surface-variant leading-relaxed">
            {t("block.subtitle")}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                  <MapPin className="text-primary" size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-on-surface">
                  {t("info.address_title")}
                </h3>
              </div>
              <p className="font-body text-on-surface-variant pl-[52px]">
                {t("info.address")}
              </p>
            </div>

            {/* Hours */}
            <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                  <Clock className="text-primary" size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-on-surface">
                  {t("info.hours_title")}
                </h3>
              </div>
              <div className="pl-[52px] space-y-3">
                {hours.map((slot) => (
                  <div key={slot} className="flex justify-between font-body text-sm">
                    <span className="text-on-surface">{t(`info.hours.${slot}.day`)}</span>
                    <span className="text-on-surface-variant font-medium">{t(`info.hours.${slot}.time`)}</span>
                  </div>
                ))}
              </div>
              <div className="pl-[52px] pt-3">
                <div className="bg-tertiary/10 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Phone className="text-tertiary flex-shrink-0" size={18} aria-hidden="true" />
                  <div>
                    <span className="font-body text-sm font-semibold text-on-surface">{t("info.emergency")}</span>
                    <a href="tel:+15145281587" onClick={() => gtmEvent('Phone_Call')} className="block font-body text-sm text-tertiary font-medium hover:underline">
                      {t("info.emergency_phone")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Access */}
            <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed/20 flex items-center justify-center">
                  <Car className="text-primary" size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-on-surface">
                  {t("info.access_title")}
                </h3>
              </div>
              <p className="font-body text-on-surface-variant pl-[52px] leading-relaxed">
                {t("info.access_description")}
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div id="rendez-vous">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
