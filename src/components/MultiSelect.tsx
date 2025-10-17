"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type Option = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: Option[];
    placeholder?: string;
    onChange?: (values: string[]) => void;
}

export function MultiSelect({ options, placeholder = "Select options...", onChange }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<Option[]>([]);

    const toggleOption = (option: Option) => {
        const isSelected = selected.some((o) => o.value === option.value);
        const newSelected = isSelected
            ? selected.filter((o) => o.value !== option.value)
            : [...selected, option];
        setSelected(newSelected);
        onChange?.(newSelected.map((o) => o.value));
    };

    const removeOption = (value: string) => {
        const newSelected = selected.filter((o) => o.value !== value);
        setSelected(newSelected);
        onChange?.(newSelected.map((o) => o.value));
    };

    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selected.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {selected.map((option) => (
                                    <Badge key={option.value} variant="secondary" className="flex items-center gap-1">
                                        {option.label}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeOption(option.value);
                                            }}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selected.some((o) => o.value === option.value);
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => toggleOption(option)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                isSelected ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
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
