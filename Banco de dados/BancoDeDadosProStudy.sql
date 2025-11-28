CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'aluno',
	imagem TEXT
);

CREATE TABLE IF NOT EXISTS professores_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS representantes_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE materias(
    id_materia SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE conteudos(
	id_conteudo SERIAL PRIMARY KEY,
	fk_materia INT,
	titulo VARCHAR(100) NOT NULL,
	link TEXT,
	imagem TEXT,
	arquivo TEXT,
	CONSTRAINT fk_materia FOREIGN KEY (fk_materia) REFERENCES materias(id_materia)
);

CREATE TABLE IF NOT EXISTS professores_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS representantes_autorizados(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz(
	id_quiz SERIAL PRIMARY KEY,
	id_materia INT,
	titulo VARCHAR(100),
	link VARCHAR(255),
	CONSTRAINT id_materia FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
);

DROP TABLE quiz

SELECT * FROM quiz

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

CREATE TRIGGER trigger_verifica_usuarios
BEFORE INSERT ON usuarios
FOR EACH ROW
EXECUTE FUNCTION verificaUsuariosAutorizados();
	
INSERT INTO professores_autorizados (email) 
VALUES ('testep2@gmail.com');

DELETE FROM professores_autorizados

VALUES ('b@gmail.com');

SELECT * FROM professores_autorizados

DROP TABLE professores_autorizados

DELETE FROM usuarios WHERE email = 'rapha@gmail.com'
SELECT * FROM usuarios

SELECT * FROM materias

UPDATE materias
SET nome = 'Inglês' 
WHERE id_materia = 10

INSERT INTO materias(nome)
VALUES('Matemática')