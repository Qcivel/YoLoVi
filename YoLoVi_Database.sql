-- ============================================================
-- YoLoVi - Base de donnees
-- Genere a partir du MCD (Rights, User, Video, Text, Series,
-- Picture, status, description) et des associations nommees :
--   Grants (Rights-User) / Creates (User-Series) / Uploads (User-Video)
--   Writes (User-Text) / Has (Video-status) / Bears (Series-status)
--   Carries (Text-status) / Includes (Video-description)
--   Contains (Series-description) / Displays (Picture-description)
--   to own (Series-Picture)
--
-- Choix retenus pour la traduction MCD -> MLD :
--   - Video, Series et Picture possedent chacun UNE description
--     (relation 1,1 <-> 1,1), d'ou une cle etrangere Id_description
--     directement dans ces 3 tables plutot que l'inverse.
--   - Text ne porte pas de description : son propre champ
--     content_text en tient deja lieu.
--   - Picture ne porte pas de status : elle herite de celui de la
--     Series (to own) a laquelle elle appartient.
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- Table : Rights
-- ------------------------------------------------------------
CREATE TABLE Rights (
    Id_Rights   INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name_rights VARCHAR(50)  NOT NULL,
    PRIMARY KEY (Id_Rights),
    UNIQUE KEY uq_rights_name (name_rights)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : status
-- ------------------------------------------------------------
CREATE TABLE status (
    Id_status   INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name_status VARCHAR(50)  NOT NULL,
    PRIMARY KEY (Id_status),
    UNIQUE KEY uq_status_name (name_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : description
-- ------------------------------------------------------------
CREATE TABLE description (
    Id_description      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    content_description  TEXT         NOT NULL,
    PRIMARY KEY (Id_description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : User
-- Association Grants (Rights 0,n -- User 1,1)
-- ------------------------------------------------------------
CREATE TABLE `User` (
    Id_User         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    login_user      VARCHAR(50)   NOT NULL,
    password_user   VARCHAR(255)  NOT NULL,
    email_user      VARCHAR(150)  NOT NULL,
    firstname_user  VARCHAR(80)   NOT NULL,
    lastname_user   VARCHAR(80)   NOT NULL,
    icon_user       VARCHAR(255)  NULL,
    discipline_user VARCHAR(100)  NULL,
    biography_user  TEXT          NULL,
    social_user     VARCHAR(255)  NULL,
    Id_Rights       INT UNSIGNED  NOT NULL,
    PRIMARY KEY (Id_User),
    UNIQUE KEY uq_user_login (login_user),
    UNIQUE KEY uq_user_email (email_user),
    CONSTRAINT fk_user_rights_grants
        FOREIGN KEY (Id_Rights) REFERENCES Rights (Id_Rights)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : Video
-- Associations Uploads (User 0,n -- Video 1,1),
--              Has (Video 1,1 -- status 0,n),
--              Includes (Video <-> description, 1,1 - 1,1)
-- ------------------------------------------------------------
CREATE TABLE Video (
    Id_video        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title_video     VARCHAR(150) NOT NULL,
    url_video       VARCHAR(255) NOT NULL,
    Id_User         INT UNSIGNED NOT NULL,
    Id_status       INT UNSIGNED NOT NULL,
    Id_description  INT UNSIGNED NOT NULL,
    PRIMARY KEY (Id_video),
    UNIQUE KEY uq_video_description (Id_description),
    CONSTRAINT fk_video_user_uploads
        FOREIGN KEY (Id_User) REFERENCES `User` (Id_User)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_video_status_has
        FOREIGN KEY (Id_status) REFERENCES status (Id_status)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_video_description_includes
        FOREIGN KEY (Id_description) REFERENCES description (Id_description)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : Text
-- Associations Writes (User 0,n -- Text 1,1),
--              Carries (Text 1,1 -- status 0,n)
-- ------------------------------------------------------------
CREATE TABLE `Text` (
    Id_Text       INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    title_text    VARCHAR(150)  NOT NULL,
    content_text  TEXT          NOT NULL,
    Id_User       INT UNSIGNED  NOT NULL,
    Id_status     INT UNSIGNED  NOT NULL,
    PRIMARY KEY (Id_Text),
    CONSTRAINT fk_text_user_writes
        FOREIGN KEY (Id_User) REFERENCES `User` (Id_User)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_text_status_carries
        FOREIGN KEY (Id_status) REFERENCES status (Id_status)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : Series
-- Associations Creates (User 0,n -- Series 1,1),
--              Bears (Series 1,1 -- status 0,n),
--              Contains (Series <-> description, 1,1 - 1,1)
-- ------------------------------------------------------------
CREATE TABLE Series (
    Id_Series       INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title_series    VARCHAR(150) NOT NULL,
    Id_User         INT UNSIGNED NOT NULL,
    Id_status       INT UNSIGNED NOT NULL,
    Id_description  INT UNSIGNED NOT NULL,
    PRIMARY KEY (Id_Series),
    UNIQUE KEY uq_series_description (Id_description),
    CONSTRAINT fk_series_user_creates
        FOREIGN KEY (Id_User) REFERENCES `User` (Id_User)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_series_status_bears
        FOREIGN KEY (Id_status) REFERENCES status (Id_status)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_series_description_contains
        FOREIGN KEY (Id_description) REFERENCES description (Id_description)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table : Picture
-- Associations to own (Series 0,n -- Picture 1,1),
--              Displays (Picture <-> description, 1,1 - 1,1)
-- ------------------------------------------------------------
CREATE TABLE Picture (
    Id_Picture      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title_picture   VARCHAR(150) NOT NULL,
    url_picture     VARCHAR(255) NOT NULL,
    Id_Series       INT UNSIGNED NOT NULL,
    Id_description  INT UNSIGNED NOT NULL,
    PRIMARY KEY (Id_Picture),
    UNIQUE KEY uq_picture_description (Id_description),
    CONSTRAINT fk_picture_series_to_own
        FOREIGN KEY (Id_Series) REFERENCES Series (Id_Series)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_picture_description_displays
        FOREIGN KEY (Id_description) REFERENCES description (Id_description)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- Donnees de reference minimales
-- ------------------------------------------------------------
INSERT INTO Rights (name_rights) VALUES ('Administrateur'), ('Artiste');
INSERT INTO status (name_status) VALUES ('Brouillon'), ('Publie');
