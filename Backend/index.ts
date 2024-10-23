import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

export const upload = multer({ storage: storage });


const createInitialAdmin = async () => {
  const existingAdmin = await prisma.user.findFirst({ where: { isAdmin: true } });
  let nome = "Luz Kabir"
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); 
    const user = await prisma.user.create({
      data: {
        nome: 'Felix Domingos',
        email: 'admin@empresa.com',
        senha: hashedPassword,
        telefone: '999999999',
        isAdmin: true,
      },
    });
    
    await prisma.empresa.create({
      data: { 
        nome,
        userId: Number(user.id)
      },
    });
    
    console.log('Admin  e Empresa criados com sucesso');
  }
};

createInitialAdmin();

app.post('/admin/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { telefone, senha } = req.body as { telefone: string; senha: string };

    const user = await prisma.user.findUnique({
      where: { telefone },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user.id }, 'SECRET_KEY');
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
});


app.put('/admin/update', async (req, res) => {
  try {
    const { id, nome, email, senha, telefone } = req.body;
    const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;

    const updatedAdmin = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        nome,
        email,
        telefone,
        ...(senha && { senha: hashedPassword }), 
      },
    });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar admin' });
  }
});

app.get('/admin/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const adminUser = await prisma.user.findUnique({
      where: { id: Number(id), isAdmin: true },
    });

    if (!adminUser) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }

    return res.json(adminUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar admin' });
  }
});
 

app.get('/empresas/:id', async (req, res) => {
  
  try {
    const { id } = req.params;

  const empresas = await prisma.empresa.findFirst({
    where:{id:Number(id)}
  });
  res.status(201).json(empresas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao Pegar Empresa' });
  }
});
 

app.put('/empresa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const empresa = await prisma.empresa.update({
      where: { id: Number(id) },
      data: { nome },
    });
    res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao Atualizar Empresa' });
  }
});

app.delete('/empresa/:id', async (req, res) => {
  try {
  const { id } = req.params;
  await prisma.empresa.delete({ where: { id: Number(id) } });
  res.json({ message: 'Empresa deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao Deletar Empresa' });
  }
});

app.get('/filiais', async (req, res) => {
  try {
  const filiais = await prisma.filial.findMany();
  res.status(201).json(filiais);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao Pegar Filial' });
  }
});


app.post('/filial', upload.single('foto'), async (req, res) => {
  try {
    const { nome, localizacao, telefone, email, empresaId, tipoFilialId } = req.body;
    const imagePath = req.file ? req.file.filename : '';
    
    const filial = await prisma.filial.create({
      data: {
        nome,
        localizacao,
        telefone,
        email,
        image:imagePath,
        empresa: { connect: { id: Number(empresaId) } },
        tipoFilial: { connect: { id: Number(tipoFilialId) } },
      },
    });
    res.status(201).json(filial);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar filial' });
  }
});


app.put('/filial/:id',  upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, localizacao, telefone, email, empresaId, tipoFilialId } = req.body;
    const imagePath = req.file ? req.file.filename : '';

    const filial = await prisma.filial.update({
      where: { id: Number(id) },
      data: {
        nome,
        localizacao,
        telefone,
        email,
        image:imagePath,
        empresa: { connect: { id: Number(empresaId) } },
        tipoFilial: { connect: { id: Number(tipoFilialId) } },
      },
    });
    res.status(201).json(filial);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao Atualizar filial' });
  }
});

app.delete('/filial/:id', async (req, res) => {
  try {
    
  const { id } = req.params;
  await prisma.filial.delete({ where: { id: Number(id) } });
  res.status(201).json({ message: 'Filial deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao Deletar filial' });
  }
});
 

app.post('/tipos', async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const tipoFilial = await prisma.tipoFilial.create({
      data: { nome, descricao },
    });
    res.status(201).json(tipoFilial);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar tipo de filial' });
  }
});
 
app.get('/tipos', async (req, res) => {
  try {
    const tiposFilial = await prisma.tipoFilial.findMany();
    res.status(200).json(tiposFilial);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao obter tipos de filial' });
  }
});


app.delete('/tipos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tipoFilial.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Notificação deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar notificação' });
  }
});

app.put('/tipos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
  
    const notificacao = await prisma.tipoFilial.update({
      where: { id: Number(id) },
      data: { nome, descricao },
    });
    res.status(200).json(notificacao);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar Notificacao' });
  } 
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
