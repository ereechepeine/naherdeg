# NaherDeg 

NaherDeg - это пользовательский скрипт (userscript), который автоматически модифицирует HTTP-ответы на сайтах с определенной системой голосования, позволяя выбирать больше вариантов в опросах.

## Зачем нужен этот скрипт?

Количество вариантов для выбора в опросах ограничивается. Этот скрипт автоматически изменяет это ограничение, позволяя вам выбрать так много вариантов, сколько вы считаете правильным.

Скрипт работает следующим образом:

1. При получении HTTP-ответа он проверяет, является ли ответ json-объектом с нужной структурой (наличие полей `elections`, `maxChoices`, `deputies`)
2. Если ответ соответствует требованиям, скрипт изменяет значение `maxChoices` на количество `deputies`, что практически убирает ограничения на количество выбранных вариантов.

Этот скрипт работает на любом сайте, где применяется совместимая система голосования.

## Установка в Chrome и основанные на нём браузеры

1. **Установите расширение Violentmonkey для Google Chrome**

    Violentmonkey - это расширение браузера, которое предоставляет API для userscripts.

    1.1 Откройте Chrome Web Store по ссылке: [Chrome Web Store](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag);
    
    1.2 Нажмите на кнопку "Добавить в Chrome" для установки расширения;

2. **Установите NaherDeg userscript**

    2.1 Перейдте по ссылке на код скрипта: [NaherDeg userscript](https://github.com/ereechepeine/naherdeg/raw/main/naherdeg.user.js);
    
    2.2 Вы будете перенаправлены на новую страницу, где Violentmonkey предложит установить новый скрипт. Нажмите на "Установить" для подтверждения.

Теперь у вас установлен NaherDeg userscript и вы можете перейти к голосованию.

## Установка на Android в Firefox

Я пока не стал писать, как это делается. Думаю пользователи Android и сами разберутся.

## Установка на iOS в Firefox

Если это возможно - напишите инструкцию [здесь](https://github.com/ereechepeine/naherdeg/issues). Я её сюда добавлю.

# Проблемы

Пишите об этом [сюда](https://github.com/ereechepeine/naherdeg/issues).
