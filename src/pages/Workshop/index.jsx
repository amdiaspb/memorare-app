import { BasePage } from "../BasePage";
import { useRedirect } from "../../hooks/useRedirect";
import { getUserData, setUserData } from "../../utils/helper";
import { WorkshopList } from "./WorkshopList";

export default function WorkshopPage() {
  useRedirect(!getUserData(), "/signin");

  return (
    <BasePage >
      <WorkshopList />
    </BasePage>
  );
}
