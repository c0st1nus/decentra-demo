"use client";

import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

import { useLanguage } from "@/context/language-provider";

export const LanguageSwitcher = () => {
  const { languageIndex, setLanguageIndex } = useLanguage();

  const languages = [
    { label: "EN", value: 0 },
    { label: "RU", value: 1 },
    { label: "KZ", value: 2 },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="min-w-fit px-3 font-medium text-default-500 hover:text-primary data-[hover=true]:bg-transparent"
          variant="light"
        >
          {languages[languageIndex].label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={new Set([languageIndex.toString()])}
        selectionMode="single"
        onAction={(key) => setLanguageIndex(Number(key))}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.value}>{lang.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
