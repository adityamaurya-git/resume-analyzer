import { Footer } from "./Components/Footer"
import { Home } from "./pages/Home"
import { MainRoutes } from "./routes/MainRoutes"

export const App = () => {
  return (<>
      <main className="w-full h-full ">
        <MainRoutes>
          <Home />
        </MainRoutes>
        <Footer />
      </main>

  </>)
}