import { useState, useEffect } from "react";
import { TextInput, Spinner } from "flowbite-react";
import SuratComp from "../components/SuratComp";

export default function Home() {
    const [suratList, setSuratList] = useState([]);
    const [search, setSearch] = useState("");
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

    const filteredSurat = suratList.filter((surat) =>
        surat.namaLatin.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Baca Al Quran</h2>
                <div className="max-w-md mx-auto">
                    <TextInput
                        id="search"
                        type="text"
                        placeholder="Cari surat (contoh: Al-Fatihah)..."
                        required
                        sizing="lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
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