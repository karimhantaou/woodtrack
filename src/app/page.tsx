"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
    const [clients, setClients] = useState([]); // State pour stocker les chargements

    async function fetchClients() {
        const { data, error } = await supabase.from('clients').select('*');
        if (error) {
            console.error('Error fetching clients:', error);
        } else {
            setClients(data); // Stocke les données dans le state
        }
    }

    return (
        <div>
            <h1>Chargements</h1>

            <div>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full button"
                    onClick={fetchClients}
                >
                    +
                </Button>
                Nouveau chargement
            </div>

            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.nom} - {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
