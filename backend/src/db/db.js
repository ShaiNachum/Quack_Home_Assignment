import { MongoClient, ObjectId } from "mongodb";
import config from "../config/config.js";
import { logger } from "../lib/logger.js";

const dbConfig = {
  uri: config.mongoDB.uri,
  dbName: config.mongoDB.database,
};

const client = new MongoClient(dbConfig.uri);


export const fetchDB = async (collectionName, id) => {
  try {
    const database = client.db(dbConfig.dbName);
    const collection = database.collection(collectionName);
    let result;

    if (id !== undefined) {
      result = await collection.findOne({id});
      logger.info(`Fetch Document from ${collectionName} with id: ${id}`);
    } else {
      result = await collection.find({}).toArray();
      logger.info(`Fetch all Documents from ${collectionName}`);
    }

    return result;
  } catch (error) {
    logger.error("Error executing query:", error);
    return null;
  }
};

export const insertDB = async (collectionName, data) => {
  try {
    const database = client.db(dbConfig.dbName);
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(data);
    logger.info(
      `Insert Document to ${collectionName} with data: ${JSON.stringify(data)}`
    );

    return result;
  } catch (error) {
    logger.error("Error executing query:", error);
  }
};

export const deleteAllDB = async (collectionName) => {
  try {
    const database = client.db(dbConfig.dbName);
    const collection = database.collection(collectionName);

    const result = await collection.deleteMany({});
    logger.info(`Delete all Documents from ${collectionName}`);

    return result;
  } catch (error) {
    logger.error("Error executing query:", error);
  }
};

export const insertManyDB = async (collectionName, data) => {
  try {
    const database = client.db(dbConfig.dbName);
    const collection = database.collection(collectionName);

    const result = await collection.insertMany(data);
    logger.info(
      `Insert Many Documents to ${collectionName} with data: ${JSON.stringify(
        data
      )}`
    );

    return result;
  } catch (error) {
    logger.error("Error executing query:", error);
  }
};

export const updateStatusDB = async (collectionName, id, status) => {
  try {
    const database = client.db(dbConfig.dbName);
    const collection = database.collection(collectionName);

    const result = await collection.updateOne(
      { id: id },
      { $set: { status: status } }
    );
    
    logger.info(`Updated Documents ${id} status to: ${status}`);

    return result;
  } catch (error) {
    logger.error("Error updating Documents status:", error);
    return null;
  }
};

export const closeDB = async () => {
  await client.close();
};