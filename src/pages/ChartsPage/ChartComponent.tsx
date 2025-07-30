import React, { useEffect, useState } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2'; 

interface ChartComponentProps {
    label: string;
    labels: string[] | null;
    data: number[] | null;
    totalPages: number;
    isMedian?: boolean;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );
    
const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
    },
};

const ChartComponent: React.FC<ChartComponentProps> = ({
    labels,
    data,
    label,
    totalPages,
    isMedian
}) => {

    const [isPages, setIsPages] = useState(false);
    const [page, setPage] = useState(1);
    const [medianInfo, setMedianInfo] = useState<number[]>([]);

    const medianInfoHandler = () => {

        if (!data || !data.length || !isMedian) {
            return setMedianInfo([]);
        }

        let top = 0;

        const resArr = [];

        const dataArr = isPages ? data.slice((page - 1) * 10, page * 10) : data;

        for (let i = 0; i < dataArr.length; i++) {

            for (let j = 0; j <= i; j++) {
                const item = dataArr[j];
                top += item ? item : 0;
            }

            const res = (top) / (i + 1);

            resArr.push(isNaN(res) || res === Infinity ? 0 : res);
            top = 0;
        }

        setMedianInfo(resArr);
        
    }

    useEffect(() => {
        medianInfoHandler();
    }, [labels, isPages, page]);

    return (
        <div>
            {
                labels && data ? 
                    <Line 
                        options={options}
                        className='chart'
                        data={{
                            labels: isPages ? labels.slice((page - 1) * 10, page * 10) : labels,
                            datasets: [
                                {
                                    label: label,
                                    data: isPages ? data.slice((page - 1) * 10, page * 10) : data,
                                    // borderWidth: 2,
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                },
                                {
                                    label: "Median",
                                    data: medianInfo,
                                    borderColor: 'rgb(50, 68, 168)',
                                    backgroundColor: 'rgba(50, 68, 168)',
                                },
                            ],
                        }} 
                    />
                : 
                    <></>
            }
            <label className='flex items-center gap-2 text-2xl mt-3 page_output'>
                <input 
                    type="checkbox"
                    checked={isPages}
                    className="w-8 h-8"
                    onChange={() => setIsPages(!isPages)}
                />
                Постраничный вывод
            </label>
            {
                totalPages > 1 && isPages ? 
                    <div className='flex gap-3 mt-3 text-2xl'>
                        <button onClick={() => {
                            if (page - 1 === 0) {
                                return;
                            }
                            setPage(page - 1);
                        }}>Назад</button>
                        <span>{page}/{totalPages}</span>
                        <button onClick={() => {
                            if (page + 1 > totalPages) {
                                return;
                            }
                            setPage(page + 1);
                        }}>Вперед</button>
                    </div>
                : 
                    <></>
            }
        </div>
    )
}

export default ChartComponent