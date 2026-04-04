import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SuratComp({ surat }) {
    return (
        <Link to={`/surat/${surat.nomor}`}>
            <Card className="max-w-sm hover:bg-gray-50 transition-colors h-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                            {surat.nomor}
                        </div>
                        <div>
                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                {surat.namaLatin}
                            </h5>
                            <p className="font-normal text-sm text-gray-500 dark:text-gray-400">
                                {surat.arti} • {surat.jumlahAyat} Ayat
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h5 className="text-2xl font-arabic text-green-600 font-medium">
                            {surat.nama}
                        </h5>
                    </div>
                </div>
            </Card>
        </Link>
    );
}