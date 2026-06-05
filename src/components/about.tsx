function About() {
  return (
    <div className="about bg-[#000BB5] w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-hey text-6xl font-rodin text-primary">
          Hey, I'm Issac Lin
        </h1>
        <img
          src="../public/images/capy.jpeg"
          alt="Issac Lin"
          className="rounded-full w-100 h-100 mt-4 aspect-square"
        />
      </div>
    </div>
  );
}

export default About;
