# 🚀 JobFlow — AI Career Tracker

JobFlow é um SaaS full-stack para gestão de candidaturas de emprego.  
Permite aos utilizadores registar, acompanhar e organizar todo o processo de procura de emprego num único dashboard.

---

# 🧠 Sobre o projeto

Este projeto foi desenvolvido como forma de aprendizagem prática de desenvolvimento full-stack moderno.

O objetivo é evoluir para uma ferramenta que ajude utilizadores a gerir candidaturas e futuramente integrar funcionalidades de IA para suporte na criação de CVs e cover letters.

---

# ⚙️ Stack utilizada

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Supabase
  - Authentication
  - PostgreSQL Database
  - Row Level Security (RLS)

---

# ✨ Funcionalidades atuais

## 🔐 Autenticação
- Registo de utilizador
- Login e logout
- Sessão persistente

## 📦 Gestão de candidaturas
- Criar candidaturas (empresa, cargo, link da vaga)
- Listar candidaturas por utilizador
- Dados isolados por utilizador (segurança com RLS)

## 🔒 Segurança
- Row Level Security (RLS) implementado
- Cada utilizador só acede aos seus próprios dados

---

# 🧱 Estrutura do projeto
app/
├── login/
├── register/
├── dashboard/

lib/
├── supabase.ts


---

# 🗄️ Base de dados (Supabase)

Tabela: `applications`

- id (uuid)
- user_id (uuid)
- company (text)
- role (text)
- job_url (text)
- status (text)
- created_at (timestamp)

# 🚀 Roadmap

## ✔ Concluído
- Sistema de autenticação
- CRUD de candidaturas
- Dashboard funcional

## 🔜 Em desenvolvimento
- Melhorias de UI/UX
- Editar e eliminar candidaturas
- Estados (applied, interview, rejected)
- Melhor organização do dashboard

## 🔮 Futuro
- Integração com IA (cover letters automáticas)
- Análise de vagas
- Exportação de CV
- Notificações inteligentes

---

# 💡 Objetivo do projeto

Este projeto foi criado com o objetivo de construir um portfólio real de desenvolvimento full-stack, simulando um produto SaaS em produção.

---

# 📌 Nota

Projeto em desenvolvimento ativo.
