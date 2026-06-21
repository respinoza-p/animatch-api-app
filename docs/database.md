# Database & Models

Animatch utilizes **MongoDB** as its primary data store, with **Mongoose** defining the models and schemas.

## Data Normalization Pattern
To maintain query efficiency and clean schema separation, the database uses a **relational lookup approach** rather than embedding large structures directly.

* **Primary Entities:** `Adoptante` and `RegistroAnimal`.
* **Lookup Collections:** 44 distinct collections storing individual parameters (e.g., `SexoAnimal`, `EstadoVacuna`, `TamanioAnimal`, `ActualmenteTengo`).
* **Relationships:** Primary collections reference lookups using MongoDB `ObjectId` types, which are populated on-demand during query fetching via `.populate()`.

---

## 💾 Database Backups

A backup setup is located at:
📁 `backup_bd/`

This contains JSON dumps of all 47 collections.

### Restoring Backups
To restore collections, you can import them into your MongoDB database using `mongoimport` or via a Node.js import script:
```bash
mongoimport --uri="YOUR_MONGODB_URI" --collection=comunas --file=backup_bd/comunas.json --jsonArray
```
