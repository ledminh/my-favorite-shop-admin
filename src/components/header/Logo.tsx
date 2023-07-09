export default function Logo() {
  return (
    <h1 className="cursor-pointer relative border-4 border-yellow-700 h-20 w-[380px] p-4 rounded-xl group hover:border-white">
      <span className="text-3xl font-bold text-white group-hover:text-yellow-700">
        YOUR FAVORITE SHOP
      </span>
      <span className="absolute text-2xl font-bold bottom-2 right-2 text-yellow-600/80 group-hover:text-white/80">
        ADMIN
      </span>
    </h1>
  );
}
