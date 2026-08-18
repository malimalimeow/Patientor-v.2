import mongoose from "mongoose"
import Diagnosis from "../models/dignosis.ts"
import type { DiagnosisType } from "../zodSchemas.ts";
import config from "./config.ts";

console.log("add Diagnosis")

const createFirstLogOfDiagnosis = async()=>{
    try{
         if(!config.MONGODB_URI){throw new Error("Can't find Db")}
                await mongoose.connect(config.MONGODB_URI)
                console.log("connected to Mongo Db")

        const existingDiagnosis =await Diagnosis.findOne({ code: "M24.2"})
if (existingDiagnosis){
            console.log("Diagnosis already exists.")
            return
        }

    const data :DiagnosisType[] = [
      {
        "code": "M24.2",
        "name": "Disorder of ligament",
        "latin": "Morbositas ligamenti"
      },
      {
        "code": "M51.2",
        "name": "Other specified intervertebral disc displacement",
        "latin": "Alia dislocatio disci intervertebralis specificata"
      },
      {
        "code": "S03.5",
        "name":
          "Sprain and strain of joints and ligaments of other and unspecified parts of head",
        "latin":
          "Distorsio et/sive distensio articulationum et/sive ligamentorum partium aliarum sive non specificatarum capitis"
      },
      {
        "code": "J10.1",
        "name":
          "Influenza with other respiratory manifestations, other influenza virus codeentified",
        "latin":
          "Influenza cum aliis manifestationibus respiratoriis ab agente virali codeentificato"
      },
      {
        "code": "J06.9",
        "name": "Acute upper respiratory infection, unspecified",
        "latin": "Infectio acuta respiratoria superior non specificata"
      },
      {
        "code": "Z57.1",
        "name": "Occupational exposure to radiation"
      },
      {
        "code": "N30.0",
        "name": "Acute cystitis",
        "latin": "Cystitis acuta"
      },
      {
        "code": "H54.7",
        "name": "Unspecified visual loss",
        "latin": "Amblyopia NAS"
      },
      {
        "code": "J03.0",
        "name": "Streptococcal tonsillitis",
        "latin": "Tonsillitis (palatina) streptococcica"
      },
      {
        "code": "L60.1",
        "name": "Onycholysis",
        "latin": "Onycholysis"
      },
      {
        "code": "Z74.3",
        "name": "Need for continuous supervision"
      },
      {
        "code": "L20",
        "name": "Atopic dermatitis",
        "latin": "Atopic dermatitis"
      },
      {
        "code": "F43.2",
        "name": "Adjustment disorders",
        "latin": "Perturbationes adaptationis"
      },
      {
        "code": "S62.5",
        "name": "Fracture of thumb",
        "latin": "Fractura [ossis/ossium] pollicis"
      },
      {
        "code": "H35.29",
        "name": "Other proliferative retinopathy",
        "latin": "Alia retinopathia proliferativa"
      }
    ];

    const insertedDiagnosis = await Diagnosis.insertMany(data)
    console.log(`added ${insertedDiagnosis.length} diagnosis codes`)
        }catch(error){
            console.log("failed to add diagnosis")
        }finally{
            await mongoose.connection.close()
        }
    }

    void createFirstLogOfDiagnosis()
    
    