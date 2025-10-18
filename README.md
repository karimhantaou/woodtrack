# WoodTrack

WoodTrack est une application web permettant de gérer différents chargements de bois. Grâce à cette application, vous pouvez ajouter de nouveaux chargements en sélectionnant le client, le transport et les produits associés.

## Technologies utilisées

- **Next.js** : Framework React pour construire des applications web modernes.
- **Supabase** : Base de données et backend en temps réel.
- **TypeScript** : Typage statique pour un code plus sûr.
- **Tailwind CSS** : Framework CSS pour un design rapide et responsive.
- **shadcn/ui** : Composants UI réutilisables pour Next.js.

<p align="center">
<img width="200" alt="logo WoodTrack" src="https://github.com/user-attachments/assets/b93ecc45-a76b-4315-a44c-49e317bcbd3f" />
</p>

## Fonctionnalités

* Gestion des chargements existants, avec affichage des produits liés à chaque chargement.
* Ajout de nouveaux chargements, avec sélection de :
    * Client
    * Transport
    * Produits
* Possibilité d'ajouter de nouveaux produits, transporteurs et clients directement dans la base de données.
* Notifications pour informer si un ajout a réussi ou s'il y a une erreur.

## Installation

1. **Installer Node.js**  
   Assurez-vous d’avoir Node.js installé sur votre machine : [Node.js](https://nodejs.org/)

2. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/WoodTrack.git
   cd WoodTrack
    ```

3. **Installer les dépendances**
    ```bash
    npm install
    ```
4. **Lancer l'application en mode développement**
    ```bash
    npm run dev
    ```
5. **Accéder à l'application**
    
    Ouvrez votre navigateur et allez à l'adresse : `http://localhost:3000`

## Composants et intégrations UI

L’application **WoodTrack** utilise plusieurs composants de **shadcn/ui** pour améliorer l’interface et l’expérience utilisateur.

- **Toaster** et **Sonner** : utilisés pour afficher des notifications lors des actions (ajout, modification, suppression, etc.).
- **Select** : utilisé dans le formulaire d’ajout de chargement pour sélectionner le client, le transport et les produits associés.

## Nouveaux composants

Plusieurs nouveaux composants ont été créés pour rendre l’application plus complète et ergonomique :

- **Formulaires** : pour l’ajout et la modification des chargements.
- **Cartes de chargement** : affichent les informations principales d’un chargement (client, transport, produits, date, etc.).
- **MultiSelect** : permet de sélectionner plusieurs options à la fois.  
  Ce composant réutilise plusieurs éléments de **shadcn/ui** comme **Command**, **CommandGroup**, **CommandItem**, **Popover** et **PopoverContent**.

# Configuration de Supabase

Pour que **WoodTrack** fonctionne, vous devez connecter l’application à une instance Supabase. Vous avez deux options : créer votre propre base ou utiliser celle déjà pré-remplie.

---

## Option 1 : Créer votre propre base Supabase

1. Rendez-vous sur [Supabase](https://supabase.com/) et créez un projet.
2. Dans **SQL Editor → New Query**, exécutez le script SQL fourni :

```
doc/bdd/woodtrack.sql
```

Cela créera toutes les tables nécessaires :
`clients`, `produits`, `transports`, `chargements`, `chargement_produits`.

3. Récupérez vos informations de connexion :

* **URL Supabase** → `NEXT_PUBLIC_SUPABASE_URL`
* **Clé publique (anon)** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ N’utilisez jamais la clé privée (`service_role`) dans le projet.

4. Créez ou modifiez le fichier `.env` à la racine du projet :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=pk_XXXXXXXXXXXXXXXXXXXXXXXX
```

5. **Activer le Row-Level Security (RLS)** pour chaque table et créer une policy pour permettre à tout le monde de **SELECT et INSERT** :

```
CREATE POLICY "Allow read and insert for everyone"
ON public.clients
AS PERMISSIVE
FOR SELECT, INSERT
TO public
USING (true)
WITH CHECK (true);
```

> Répétez pour toutes les tables (`clients`, `produits`, `transports`, `chargements`, `chargement_produits`).

---

## Option 2 : Utiliser la base déjà configurée

Pour tester rapidement, vous pouvez utiliser la base Supabase pré-remplie :

```
NEXT_PUBLIC_SUPABASE_URL=https://xzcajomohdqethsrrkqx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y2Fqb21vaGRxZXRoc3Jya3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjQ2NjksImV4cCI6MjA3NjIwMDY2OX0.DW7v3AxhJLjxX3fEiRvyuerlOZV1_67KzjRs3nkdi4I
```

Toutes les tables sont déjà créées et remplies, vous pouvez directement consulter les chargements et ajouter de nouveaux éléments.

## Structure de la base de données

La base de données de **WoodTrack** comprend cinq tables principales :

### chargements
Contient les informations principales sur chaque chargement.  
Champs : `id`, `client_id`, `transport_id`, `created_at`, `status`.

Relations :
- `client_id` → `clients.id`
- `transport_id` → `transports.id`

### chargement_produits
Table de liaison entre les chargements et les produits.  
Champs : `id`, `chargement_id`, `produit_id`, `quantity`.

Relations :
- `chargement_id` → `chargements.id`
- `produit_id` → `produits.id`

### produits
Liste les produits disponibles.  
Champs : `id`, `nom`.

### clients
Informations sur les clients.  
Champs : `id`, `nom`, `prénom`, `email`.

### transports
Informations sur les transporteurs.  
Champs : `id`, `nom`.
