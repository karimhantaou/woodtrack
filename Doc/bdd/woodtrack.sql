-- Suppression des tables existantes si elles existent (pour éviter les conflits)
DROP TABLE IF EXISTS public.chargement_produits CASCADE;
DROP TABLE IF EXISTS public.chargements CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.produits CASCADE;
DROP TABLE IF EXISTS public.transports CASCADE;

-- Table clients
CREATE TABLE public.clients (
                                id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                                nom text NOT NULL,
                                prenom text NOT NULL,
                                email text NOT NULL UNIQUE,
                                CONSTRAINT clients_pkey PRIMARY KEY (id)
);

-- Table produits
CREATE TABLE public.produits (
                                 id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 nom text NOT NULL UNIQUE,
                                 CONSTRAINT produits_pkey PRIMARY KEY (id)
);

-- Table transports
CREATE TABLE public.transports (
                                   id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                                   nom text NOT NULL UNIQUE,
                                   CONSTRAINT transports_pkey PRIMARY KEY (id)
);

-- Table chargements
CREATE TABLE public.chargements (
                                    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                                    client_id bigint NOT NULL,
                                    transport_id bigint NOT NULL,
                                    created_at timestamp with time zone NOT NULL DEFAULT now(),
                                    status smallint NOT NULL DEFAULT 0,
                                    CONSTRAINT chargements_pkey PRIMARY KEY (id),
                                    CONSTRAINT chargements_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id),
                                    CONSTRAINT chargements_transport_id_fkey FOREIGN KEY (transport_id) REFERENCES public.transports(id)
);

-- Table chargement_produits
CREATE TABLE public.chargement_produits (
                                            id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                                            chargement_id bigint NOT NULL,
                                            produit_id bigint NOT NULL,
                                            CONSTRAINT chargement_produits_pkey PRIMARY KEY (id),
                                            CONSTRAINT chargement_produits_chargement_id_fkey FOREIGN KEY (chargement_id) REFERENCES public.chargements(id),
                                            CONSTRAINT chargement_produits_produit_id_fkey FOREIGN KEY (produit_id) REFERENCES public.produits(id)
);
