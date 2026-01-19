export default function NotFound() {


    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-black bg-[url('/error/not-found-404.jpg')] bg-no-repeat bg-center  ">
            <h1 className="text-3xl font-semibold mb-6 z-10">
                You mustn’t be here!
            </h1>
            <div>
                <img src="/error/photo-error.png"  alt="404 illustration"  className="w-64 z-10"/>
            </div>

        </div>
    );
}
