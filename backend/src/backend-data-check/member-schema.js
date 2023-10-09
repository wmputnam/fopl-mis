let memberSchema = {
  $jsonSchema: {
    required: ["first name", "last name"],
    properties: {
      "first name": { bsonType: "string" },
      "last name": { bsonType: "string" },
      address: { bsonType: "string" },
      unit: { bsonType: "string" },
      city: { bsonType: "string" }
    }
  }
}