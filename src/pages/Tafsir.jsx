import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Card } from "flowbite-react";

export default function Tafsir() {
    const { id } = useParams();
    const [tafsir, setTafsir] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://equran.id/api/v2/tafsir/${id}`);
                const result = await response.json();
                setTafsir(result.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center py-20">
            <Spinner size="xl" color="success" />
        </div>
    );
    if (!tafsir) return <p className="text-center py-10">Tafsir tidak ditemukan.</p>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to={`/surat/${id}`} className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Ayat
            </Link>

            <Card className="mb-8 text-center border-t-4 border-t-green-500 shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tafsir Surat {tafsir.namaLatin}</h2>
                <p className="text-gray-500 mt-2 dark:text-gray-400">{tafsir.arti} • {tafsir.tempatTurun}</p>
            </Card>

            <div className="space-y-6">
                {tafsir.tafsir.map((item) => (
                    <Card key={item.ayat} className="shadow-sm">
                        <h3 className="font-bold text-lg text-green-700 mb-2 border-b pb-3">
                            Ayat {item.ayat}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                            {item.teks}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
}