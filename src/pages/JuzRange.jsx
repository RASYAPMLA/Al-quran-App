import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import SuratComp from "../components/SuratComp";

export default function JuzRange() {
    const { range } = useParams();
    const [suratList, setSuratList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://equran.id/api/v2/surat");
                const result = await response.json();
                setSuratList(result.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    let filteredSurat = [];
    let subtitle = "";

    if (range === "1-10") {
        subtitle = "Juz 1 - 10 (Al-Fatihah s.d At-Taubah)";
        filteredSurat = suratList.slice(0, 9);
    } else if (range === "11-20") {
        subtitle = "Juz 11 - 20 (Yunus s.d Al-Ankabut)";
        filteredSurat = suratList.slice(9, 29);
    } else if (range === "21-30") {
        subtitle = "Juz 21 - 30 (Ar-Rum s.d An-Nas)";
        filteredSurat = suratList.slice(29, 114);
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Daftar Surat</h2>
                <p className="text-gray-500 font-medium">{subtitle}</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spinner size="xl" color="success" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSurat.length > 0 ? (
                        filteredSurat.map((surat) => (
                            <SuratComp key={surat.nomor} surat={surat} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">Surat tidak ditemukan.</p>
                    )}
                </div>
            )}
        </div>
    );
}