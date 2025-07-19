# 💼 Setup Employee Crud Database 

- Create, Read, update, dan delete employee



### 1. Clone Repository

```bash
git clone https://github.com/adyarizki/employee-dbcrud.git
cd name_project

### 2. Install Dependency
pnpm install

### 3.  configuration Environment
buat file .env dan salin isi dari env.example kedalam file .env yang telah dibuat
selanjurnya isi env key yang dibutuhkan

### 4. setup prisma
npx prisma generate
npx prisma db push
  if you want to add a migration, use :
npx prisma migrate dev --name init

###5. Run APP
pnpm run dev

