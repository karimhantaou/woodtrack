"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type ProduitOption = {
    id: string | number;
    nom: string;
};

interface MultiSelectProps {
    produits: ProduitOption[];
    placeholder?: string;
    onChange?: (ids: (string | number)[]) => void;
}

export function MultiSelect({ produits, placeholder = "Sélectionner des produits...", onChange }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<ProduitOption[]>([]);

    const toggleProduit = (produit: ProduitOption) => {
        const isSelected = selected.some((p) => p.id === produit.id);
        const newSelected = isSelected
            ? selected.filter((p) => p.id !== produit.id)
            : [...selected, produit];
        setSelected(newSelected);
        onChange?.(newSelected.map((p) => p.id));
    };

    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {selected.length > 0 ? (
                            <div className="flex flex-wrap gap-1 overflow-hidden">
                                {selected.slice(0, 3).map((produit) => (
                                    <Badge key={produit.id} variant="secondary">
                                        {produit.nom}
                                    </Badge>
                                ))}
                                {selected.length > 3 && (
                                    <Badge variant="secondary">+{selected.length - 3}</Badge>
                                )}
                            </div>
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="Rechercher..." />
                        <CommandEmpty>Aucun produit trouvé.</CommandEmpty>
                        <CommandGroup>
                            {produits.map((produit) => {
                                const isSelected = selected.some((p) => p.id === produit.id);
                                return (
                                    <CommandItem key={produit.id} onSelect={() => toggleProduit(produit)}>
                                        <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                                        {produit.nom}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
