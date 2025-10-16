import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <h1>Chargements</h1>

      <div>
          <Button variant="outline" size="icon" className="rounded-full button">
              +
          </Button>
        Nouveau chargement
      </div>
    </div>
  );
}
