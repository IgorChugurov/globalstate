# Описание системы поставки веб-приложений для пользователей различных компаний

## Терминология

1. **Проект**:

   - Это сущность высшего уровня, которая определяет настройки для конкретного веб-приложения и список сущностей, с которыми оно работает.

2. **Компания (Рабочее пространство)**:

   - Сущность высшего уровня, задающая значения настроек для каждого конкретного приложения.

3. **Администратор проектов**:

   - Администратор, который создает проекты и рабочие пространства, задает настройки для проектов в рабочих пространствах, а также назначает администраторов компаний.

4. **Администратор компании (рабочего пространства)**:

   - Администратор, управляющий сущностями рабочего пространства (компании), определенными в проекте.

5. **Приложение или пользовательский интерфейс**:

   - Веб-приложение, используемое пользователем в рамках виртуального рабочего пространства, задающего набор настроек для него, а также сущностей и их взаимосвязей.

6. **Пользователь веб-приложения**:
   - Пользователь веб-приложения в виртуальном рабочем пространстве, который получает доступ к функционалу приложения, используя настройки и сущности, созданные для данной виртуальной среды.

## Основные положения

- В этом документе не рассматриваются вопросы механизма обеспечения прав доступа админам и пользователям к управлению проектами, компаниями или веб-приложениями.

## Основной рабочий процесс

1. **Создание и настройка**:

   - Супер админ создает приложение, определяет для него перечень настроек, набор сущностей и их взаимосвязи.
   - Супер админ создает компании (рабочие пространства) и задает для них значения настроек.
   - Супер админ назначает администраторов для управления сущностями рабочих пространств (компаний).

2. **Управление сущностями**:

   - Администратор рабочих пространств создает необходимые сущности для пользователей веб-приложения в соответствии с логикой работы и задачами приложения.

3. **Использование приложения**:
   - Пользователь запрашивает веб-приложение из рабочего пространства и получает его, сконфигурированное для данного рабочего пространства (компании), с доступом к функционалу приложения.

## Дополнение

- Виртуальное рабочее пространство — это веб-приложение, доставленное пользователю с набором настроек для его компании.

## Постановка задачи.

Создание веб интерфейса для управления настройками микрофронтенда для компаний или групп компаний в которые объеденены пользователи этого микрофронтенда.

Для решения этой задачи создается веб интерфейс со следующими возможностями.

терминология в рамках этого веб интерфейса.

1. проект - микрофронтенд предоставляющее определенный функционал (template2.0).
2. юзер - пользователь проектом
3. компания - объединение пользозователей с набором настроек для использования проекта
4. сущности компании - набор сущностей для использования юзером в проекте (напримеh template,output).
5. группа компаний - объединение компаний с набором настроек для использования проекта
6. администратор компании или группы компаний - управляет сущностями проекта доступными юзерам при использовании проекта а так же дополнительными настройками для проекта.

7. администатор проектов и компаний(суперадмин) - создает проекты . управляет набором настроек для компаний и групп компаний для каждого проекта. так же создает
   администраторов компании для управления сущностями проекта для компании.

## Основной рабочий процесс

1. **Создание и настройка**:

   - создание компаний и групп компаний на основе данных parent application
   - Суперадмин создает приложение, определяет для него перечень настроек, набор сущностей и их взаимосвязи.
   - Суперадмин задает значения настроек приложения для кажной компании или групп компании
   - Суперадмин назначает администраторов для управления сущностями компаний

2. **Управление сущностями**:

   - Администратор компаний создает необходимые сущности для пользователей проекта(микрофронтенда) в соответствии с логикой работы и задачами приложения.

3. **Использование приложения**:
   - Пользователь запрашивает микрофронтенд из parent application и получает его, сконфигурированное для компании или группы компаний в которую входит пользователь,

## Резюме

Мы предлагаете систему, где:

1. Супер админ управляет созданием и настройкой проектов и компаний. 1 админ панель
2. Администратор компании управляет сущностями внутри компании и доп настройками для копмании и групп компаний . 2 админ панель
3. Пользователь получает доступ к веб-приложению, настроенному под специфику компании, в которой он работает.

Этот подход позволяет адаптировать веб-приложения под специфические потребности различных компаний, обеспечивая гибкость и масштабируемость.