import Cta from "@/components/Cta";

const Home = async () => {
  return (
    <div className="h-screen ">
      <div className="flex flex-col items-center mt-24 px-2">
        <div className="text-left">
          <h1 className="text-4xl mb-2">
            <span className="block font-semibold">Preisalarme</span>
            <span className="block text-orange-500">für deine Aktien</span>
          </h1>
          <p className="mb-4">Lass dich einfach per Web Push benachrichtigen.</p>
          <div className="flex space-x-2 mb-4">
            <Cta type="login" />
            <Cta type="register" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
