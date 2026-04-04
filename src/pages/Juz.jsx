import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Spinner, Card } from "flowbite-react";

export default function Juz() {
    const { id } = useParams();
    const [juzData, setJuzData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://equran.id/api/v2/juz/${id}`);
                const result = await response.json();
                setJuzData(result.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    const playAudio = (audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <Spinner size="xl" color="success" />
        </div>
    );
    if (!juzData) return <p className="text-center py-10">Data Juz tidak ditemukan.</p>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Beranda
            </Link>


            <div className="bg-green-600 text-white rounded-2xl p-8 text-center shadow-lg mb-8">
                <h2 className="text-4xl font-bold mb-2">Juz {juzData.juz}</h2>
                <p className="text-green-100 mt-2 text-lg">
                    Mulai: {juzData.juzStartInfo}
                </p>
                <p className="text-green-100 text-lg">
                    Selesai: {juzData.juzEndInfo}
                </p>
            </div>


            <div className="space-y-6">
                {juzData.ayat.map((item, index) => (
                    <Card key={index} className="shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-400 font-semibold mb-1">Surat {item.surat.namaLatin}</span>
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                                    {item.nomorAyat}
                                </div>
                            </div>
                            <Button color="light" pill onClick={() => playAudio(item.audio['05'])}>
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                            </Button>
                        </div>

                        <div className="text-right mb-6">
                            <p className="text-3xl font-arabic leading-loose text-gray-800 dark:text-gray-100" dir="rtl">
                                {item.teksArab}
                            </p>
                        </div>

                        <div className="text-left space-y-2">
                            <p className="text-green-600 dark:text-green-400 font-medium italic">{item.teksLatin}</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.teksIndonesia}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}