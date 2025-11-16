// Navbar.tsx
export default function Navbar() {
return (
<nav className="w-full bg-sky-600 text-white p-4 flex justify-between items-center shadow-md">
<h1 className="text-xl font-bold">Mi App</h1>
<div className="flex gap-4">
<a href="/" className="hover:underline">Home</a>
<a href="/login" className="hover:underline">Login</a>
<a href="/register" className="hover:underline">Register</a>
<a href="/mis" className="hover:underline">Mis</a>
</div>
</nav>
);
}


