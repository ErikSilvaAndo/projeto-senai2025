CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
<<<<<<< HEAD
    tipo VARCHAR(20) NOT NULL DEFAULT 'aluno'
=======
    tipo VARCHAR(20) NOT NULL DEFAULT 'aluno'  -- padrão aluno
>>>>>>> 6250c199b7e0c44a544fef34dcd91549cc2b3293
);
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS professores_autorizados CASCADE;

CREATE TABLE IF NOT EXISTS professores_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS representantes_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

select * from representantes_autorizados


DROP TABLE usuarios

CREATE TABLE materias(
    id_materia SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE conteudos(
<<<<<<< HEAD
	id_conteudo SERIAL PRIMARY KEY,
	fk_materia INT,
	titulo VARCHAR(100) NOT NULL,
	link TEXT,
	imagem TEXT,
	arquivo TEXT,
	CONSTRAINT fk_materia FOREIGN KEY (fk_materia) REFERENCES materias(id_materia)
=======
    id_conteudo SERIAL PRIMARY KEY,
    fk_materia INT,
    titulo VARCHAR(100) NOT NULL,
    imagem TEXT,
    descricao VARCHAR(100) NOT NULL,
    arquivo TEXT,
    CONSTRAINT fk_conteudos_materia FOREIGN KEY (fk_materia) REFERENCES materias(id_materia)
>>>>>>> 6250c199b7e0c44a544fef34dcd91549cc2b3293
);


SELECT * FROM materias
SELECT * FROM usuarios WHERE nome = 'erik@gmail.com'
SELECT * FROM usuarios WHERE id_usuario = 1
DELETE FROM usuarios WHERE id_usuario = 2
INSERT INTO materias(nome) VALUES('Matemática') RETURNING *

INSERT INTO conteudos(fk_materia, titulo, imagem, descricao, arquivo) 
VALUES(1, 'Função do 1ºgrau', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.todamateria.com.br%2Ffuncao-afim%2F&psig=AOvVaw0SavdoHsva4Ciz7bDhf-lR&ust=1756475885008000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDmmdzUrY8DFQAAAAAdAAAAABAE', 'Aprendendo função', 'https://codap.ufs.br/uploads/page_attach/path/8473/Fun__o_de_1__grau.pdf' ) RETURNING *

SELECT * FROM conteudos

UPDATE conteudos
SET fk_materia = 2, titulo = 'Teste', imagem = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dicasdecalculo.com.br%2Ffuncao-do-2-grau-definicao%2F&psig=AOvVaw12ahQtV6F7_sJw0NyGrwgN&ust=1756572274380000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDG2uW7sI8DFQAAAAAdAAAAABAE', descricao = 'Teste', arquivo = 'https://www.ufs.br/uploads/page_attach/path/8506/Fun__o_de_2__grau.pdf'
WHERE id_conteudo = 16 RETURNING *

DELETE FROM conteudos WHERE id_conteudo = 1

CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20)
);

DROP TABLE usuarios
DROP TABLE conteudos
DROP TABLE materias
DROP TABLE conteudos;

-- Tabela de professores autorizados (whitelist)
CREATE TABLE IF NOT EXISTS professores_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS representantes_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

<<<<<<< HEAD
=======
select * from usuarios 
select * from conteudos
select * from professores_autorizados

 DROP FUNCTION verificaProfessoresAutorizados();
>>>>>>> 6250c199b7e0c44a544fef34dcd91549cc2b3293
CREATE OR REPLACE FUNCTION verificaUsuariosAutorizados()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica primeiro se é professor
    IF EXISTS (
        SELECT 1 FROM professores_autorizados 
        WHERE LOWER(email) = LOWER(NEW.email)
    ) THEN
        NEW.tipo := 'professor';
    
    -- Se não for professor, verifica se é representante
    ELSIF EXISTS (
        SELECT 1 FROM representantes_autorizados
        WHERE LOWER(email) = LOWER(NEW.email)
    ) THEN
        NEW.tipo := 'representante';

    -- Caso contrário, aluno
    ELSE
        NEW.tipo := 'aluno';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD
=======
DROP TRIGGER IF EXISTS trg_verificaProfessoresAutorizados ON usuarios;
>>>>>>> 6250c199b7e0c44a544fef34dcd91549cc2b3293

CREATE TRIGGER trigger_verifica_usuarios
BEFORE INSERT ON usuarios
FOR EACH ROW
EXECUTE FUNCTION verificaUsuariosAutorizados();

<<<<<<< HEAD
INSERT INTO usuarios (nome, email, senha, tipo )
VALUES 
('Rapha', 'rapha1@gmail.com', '123456', 'professor' );
=======
INSERT INTO representantes_autorizados (email) VALUES ('erik@gmail.com');
INSERT INTO representantes_autorizados (email) VALUES ('guilerme@gmail.com');
>>>>>>> 6250c199b7e0c44a544fef34dcd91549cc2b3293

INSERT INTO professores_autorizados (email) 
VALUES ('rapha@gmail.com');

<<<<<<< HEAD
SELECT * FROM usuarios

DELETE FROM usuarios WHERE id_usuario = 2
=======
INSERT INTO usuarios(email) 
VALUES ('rapha@gmail.com');
INSERT INTO representantes_autorizados (email) VALUES ('lider@turma.com');
INSERT INTO usuarios (nome, email, senha) VALUES ('Maria', 'lider@turma.com', '123');
select * from 

select * from usuarios
INSERT INTO usuarios (nome, email, senha, tipo )
VALUES 
('Maria Silva', 'maria@gmail.com', '123456', 'aluno' ),
('João Pereira', 'joao@gmail.com', '123456' , 'professor'),
('Rapha', 'rapha@gmail.com', '123456', 'professor' );

SELECT id_materia, nome FROM materias WHERE id_materia = 1
SELECT * FROM conteudos WHERE fk_materia = 1
>>>>>>> 6250c199b7e0c44a544fef34dcd91549cc2b3293
