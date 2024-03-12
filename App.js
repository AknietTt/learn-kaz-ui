import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Navigate from "./static/Navigate";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Navigate />
    </ApplicationProvider>
  );
}
