/**
 * Snippets del explorador "Código en acción".
 */
export interface Snippet {
  id: string;
  title: string;
  file: string;
  language: string;
  category: string;
  dot: string;
  description: string;
  tags: string[];
  code: string;
}

export const snippets: Snippet[] = [
  {
    id: 'next-ts',
    title: 'Perfil como Server Component tipado',
    file: 'app/perfil/page.tsx',
    language: 'TypeScript',
    category: 'Next.js',
    dot: '#00A3FF',
    description:
      'Página de perfil en Next.js App Router: tipos estrictos, metadata propia y render del lado del servidor.',
    tags: ['Next.js 15', 'App Router', 'TypeScript', 'RSC'],
    code: `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucas González Righi · Full Stack Developer',
};

type Role = 'Full Stack' | 'Automation';

interface Profile {
  name: string;
  role: Role;
  stack: string[];
}

const profile: Profile = {
  name: 'Lucas González Righi',
  role: 'Full Stack',
  stack: ['Next.js', 'TypeScript', 'Node.js'],
};

export default function Page() {
  return (
    <main className="profile">
      <h1>{profile.name}</h1>
      <p>Construyo productos que escalan.</p>
    </main>
  );
}`,
  },
  {
    id: 'python-django',
    title: 'Vista de perfil con Django',
    file: 'perfil/views.py',
    language: 'Python',
    category: 'Python · Django',
    dot: '#00FF88',
    description:
      'Class-based view en Django que expone el perfil como JSON: atributos declarativos y respuesta tipada.',
    tags: ['Python', 'Django', 'CBV', 'JSON API'],
    code: `from django.http import JsonResponse
from django.views import View

class DeveloperProfile(View):
    role = "Full Stack Developer"
    passions = ["Automatización", "APIs", "Data"]

    def mission(self):
        return (
            "Desarrollo backends claros, "
            "medibles y fáciles de mantener."
        )

    def get(self, request):
        return JsonResponse({
            "role": self.role,
            "passions": self.passions,
            "mission": self.mission(),
        })

# ¿Listo para colaborar?`,
  },
  {
    id: 'react-js',
    title: 'Componente de perfil con hooks',
    file: 'DeveloperProfile.jsx',
    language: 'JavaScript',
    category: 'React.js',
    dot: '#FFD84D',
    description:
      'Componente funcional en React con estado local: interfaz limpia, accesible y lista para componer.',
    tags: ['React', 'Hooks', 'JSX', 'UI'],
    code: `import { useState } from "react";

export default function DeveloperProfile() {
  const [role] = useState("Full Stack Developer");
  const passions = ["UI/UX", "Creative Code", "Problem Solving"];

  const mission = () =>
    "Construyo interfaces limpias, accesibles y atractivas.";

  return (
    <section className="profile">
      <h1>{role}</h1>
      <p>{mission()}</p>
    </section>
  );
}

// ¿Listo para colaborar?
// <DeveloperProfile />`,
  },
  {
    id: 'sqlserver',
    title: 'Modelo y consulta del perfil',
    file: 'perfil.sql',
    language: 'SQL · MySQL',
    category: 'SQL Server',
    dot: '#4E9FD4',
    description:
      'DDL y consultas sobre SQL Server: tabla tipada, inserción y lectura ordenada del perfil.',
    tags: ['SQL Server', 'MySQL', 'DDL', 'Queries'],
    code: `CREATE TABLE developer_profile (
  id INT IDENTITY(1,1) PRIMARY KEY,
  full_name NVARCHAR(80) NOT NULL,
  role NVARCHAR(40) DEFAULT 'Full Stack',
  years_exp INT
);

INSERT INTO developer_profile (full_name, role, years_exp)
VALUES ('Lucas González Righi', 'Full Stack Developer', 4);

SELECT full_name, role
FROM developer_profile
WHERE years_exp >= 4
ORDER BY years_exp DESC;`,
  },
  {
    id: 'node-js',
    title: 'API de perfil con Express',
    file: 'server.js',
    language: 'JavaScript',
    category: 'Node.js',
    dot: '#21E07F',
    description:
      'Servidor Node.js con Express que publica el perfil como endpoint REST, listo para consumir.',
    tags: ['Node.js', 'Express', 'REST', 'API'],
    code: `const express = require('express');
const app = express();

const profile = {
  name: 'Lucas González Righi',
  role: 'Full Stack Developer',
  stack: ['Node.js', 'Express', 'MongoDB'],
};

app.get('/api/perfil', (req, res) => {
  res.json({ ...profile, disponible: true });
});

app.listen(3000, () => {
  console.log('Perfil disponible en /api/perfil');
});`,
  },
  {
    id: 'dart-flutter',
    title: 'Perfil como app Flutter',
    file: 'main.dart',
    language: 'Dart',
    category: 'Dart · Flutter',
    dot: '#FF5C5C',
    description:
      'App mínima en Flutter: widget declarativo con el perfil renderizado nativo en cualquier dispositivo.',
    tags: ['Dart', 'Flutter', 'Widgets', 'Mobile'],
    code: `import 'package:flutter/material.dart';

void main() => runApp(const ProfileApp());

class ProfileApp extends StatelessWidget {
  const ProfileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Lucas · Full Stack Developer',
            style: TextStyle(fontSize: 24),
          ),
        ),
      ),
    );
  }
}`,
  },
];
