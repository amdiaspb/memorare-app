import { useState } from "react";
import { BasePage } from "../BasePage";
import { useRedirect } from "../../hooks/useRedirect";
import { getUserData, setUserData } from "../../utils/helper";
import { WorkshopCreate } from "./WorkshopCreate";
import { WorkshopMain } from "./WorkshopMain";

export default function WorkshopPage() {
  useRedirect(!getUserData(), "/signin");
  const [selectedDeck, setSelectedDeck] = useState(null);

  return (
    <BasePage onExit={() => setSelectedDeck(null)}>
      { selectedDeck 
        ? <WorkshopCreate deck={selectedDeck} setDeck={setSelectedDeck}/>
        : <WorkshopMain setDeck={setSelectedDeck}/>
      }
    </BasePage>
  );
}
