import {useState} from "react";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {addClient} from "@/lib/addClient";
import {addTransport} from "@/lib/addTransport";
import {addProduit} from "@/lib/addProduit";

/*
Type entrée en paramètre:
- 0 : Client
- 1 : Produit
- 2 : Transporteur

*/

// Paramètre
interface addDataFormProps {
    type: number;
}

// Retourne le nom de l'élement à ajouter dans la bdd
function typeName(status:number){
    switch (status) {
        case 0: return "client";
        case 1: return "produit";
        case 2: return "transporteur";
        default: return "Préparation";
    }
}

export default function AddDataForm({ type, onClose }: { type: number; onClose: () => void }) {

    async function submit(){

        // Client
        if(type == 0){
            if(prénom && nom && email){
                const result = await addClient(nom, prénom, email);
                if(result){
                    toast("Le client " + prénom + " " + nom + " a bien été ajouté.")
                } else{
                    toast("Le client n'a pas pu être ajouté à la base de données.")
                }
            } else{
                toast("Merci de remplir touts les champs.")
            }
        }

        // Produit
        if(type == 1){
            if(nom){
                const result = await addProduit(nom);
                if(result){
                    toast("Le produit " + nom + " a bien été ajouté.")
                } else{
                    toast("Le produit n'a pas pu être ajouté à la base de données.")
                }
            } else{
                toast("Merci de remplir touts les champs.")
            }
        }

        // Transporteur
        if(type == 2){
            if(nom){
                const result = await addTransport(nom);
                if(result){
                    toast("Le transporteur " + nom + " a bien été ajouté.")
                } else{
                    toast("Le transporteur n'a pas pu être ajouté à la base de données.")
                }
            } else{
                toast("Merci de remplir touts les champs.")
            }
        }
    }

    const title = typeName(type);

    // Différentes variable useState pour récupérer les valeurs dans le formulaire.
    const [nom, setNom] = useState<string>("");
    const [prénom, setPrénom] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return(

        <div className={"fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50"}>
           <Toaster/>
            <div className={"p-6 flex flex-col gap-4 border-1 border-stone-500 rounded-lg w-2/5 bg-stone-100 shadow-black shadow-xs"}>
                <div className={"w-full mb-2"}>
                    <button onClick={onClose} className="border-1 border-gray-700 flex justify-center items-center w-5 h-5 p-1 hover:bg-stone-700 hover:text-white transition rounded-full transition-all duration-300">X</button>
                </div>
                    <h2 className={"mb-3"}>Ajouter un nouveau {title} :</h2>

                    {/* Produit et transporteur */}
                    {type != 0 && (
                        <div className={"w-full flex justify-center gap-4"}>
                            <input className={"border-1 border-gray-300 outline-none p-1"} placeholder={"Nom"} required={true} onChange={(e) => setNom(e.target.value)}/>
                            <button className={"hover:bg-stone-700 hover:text-white p-1 transition"} onClick={submit}>Ajouter</button>
                        </div>
                    )}



                    {/* Client */}
                    {type == 0 &&(
                        <div className={"w-full flex justify-center gap-4"}>
                            <input className={"border-1 border-gray-300 outline-none p-1"} placeholder={"Nom"} required={true} onChange={(e) => setNom(e.target.value)}/>
                            <input className={"border-1 border-gray-300 outline-none p-1"} placeholder={"Prénom"} required={true} onChange={(e) => setPrénom(e.target.value)}/>
                            <input className={"border-1 border-gray-300 outline-none p-1"} placeholder={"Email"} required={true} onChange={(e) => setEmail(e.target.value)}/>
                            <button className={"hover:bg-stone-700 hover:text-white p-1 transition-all duration-300"} onClick={submit}>Ajouter</button>
                        </div>
                    )}
            </div>
        </div>
    )
}

