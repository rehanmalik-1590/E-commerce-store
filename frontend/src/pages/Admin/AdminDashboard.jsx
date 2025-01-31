import Chart from 'react-apexcharts';
import { useGetUsersQuery } from '../../redux/api/usersApiSlice';
import { 
    useGetTotalOrdersQuery,
    useGetTotalSalesByDateQuery,
    useGetTotalSalesQuery,
} from '../../redux/api/orderApiSlice';
import { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import OrderList from './OrderList';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery();
    const { data: customers, isLoading: loading } = useGetUsersQuery();
    const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
    const { data: salesDetail } = useGetTotalSalesByDateQuery();

    const [chartType, setChartType] = useState("donut"); // State for dynamic chart type
    const [state, setState] = useState({
        options: {
            chart: {
                type: "donut", // Default chart type
            },
            tooltip: {
                theme: "dark",
            },
            colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0"], // Custom color palette
            title: {
                text: "Sales Data",
                align: "center",
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                },
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
            },
            xaxis: {
                categories: [], // Placeholder for area/scatter/heatmap chart categories
            },
        },
        series: [], // Placeholder for sales data
    });

    useEffect(() => {
        if (salesDetail) {
            console.log("Sales Detail:", salesDetail); // Log to check the data structure

            if (salesDetail.length > 0) {
                // Filter and sanitize data
                const formattedSalesData = salesDetail.map((item) => {
                    // Check if _id is a valid date, and format it
                    const date = item._id ? new Date(item._id) : null;
                    const formattedDate = date && !isNaN(date) 
                        ? date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) 
                        : "Invalid Date";

                    return {
                        label: formattedDate !== "Invalid Date" ? formattedDate : "Unknown Date",
                        value: isNaN(item.totalSales) ? 0 : item.totalSales, // Replace invalid numbers with 0
                    };
                });

                setState((prevState) => {
                    // Adjust configuration for specific chart types
                    if (chartType === "donut" || chartType === "pie") {
                        return {
                            ...prevState,
                            options: {
                                ...prevState.options,
                                labels: formattedSalesData.map((item) => item.label),
                            },
                            series: formattedSalesData.map((item) => item.value),
                        };
                    } else {
                        return {
                            ...prevState,
                            options: {
                                ...prevState.options,
                                xaxis: {
                                    ...prevState.options.xaxis,
                                    categories: formattedSalesData.map((item) => item.label),
                                },
                            },
                            series: [
                                {
                                    name: "Total Sales",
                                    data: formattedSalesData.map((item) => item.value),
                                },
                            ],
                        };
                    }
                });
            } else {
                console.warn("No sales detail data available");
            }
        }
    }, [salesDetail, chartType]);

    // Update chart type dynamically
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            options: {
                ...prevState.options,
                chart: {
                    ...prevState.options.chart,
                    type: chartType, // Update the chart type
                },
            },
        }));
    }, [chartType]);

    return (
        <>
            <AdminMenu />

            <section className="ml-2 md:ml-8 lg:ml-16">
                {/* Centered Stats Section */}
                <div className="w-full flex justify-center gap-6 flex-wrap mt-8">
                    <div className="shadow-md rounded-lg p-5 w-[18rem] md:w-[20rem] lg:w-[20rem] text-center">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3 mx-auto">
                            $
                        </div>
                        <p className="mt-5">Sales</p>
                        <h1 className="text-xl font-bold">
                            {isLoading ? <Loader /> : `$ ${sales?.totalSales.toFixed(2)}`}
                        </h1>
                    </div>
                    <div className="shadow-md rounded-lg p-5 w-[18rem] md:w-[20rem] lg:w-[24rem] text-center">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3 mx-auto">
                            $
                        </div>
                        <p className="mt-5">Customers</p>
                        <h1 className="text-xl font-bold">
                            {loading ? <Loader /> : customers?.length}
                        </h1>
                    </div>
                    <div className="shadow-md rounded-lg p-5 w-[18rem] md:w-[20rem] lg:w-[24rem] text-center">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3 mx-auto">
                            $
                        </div>
                        <p className="mt-5">All Orders</p>
                        <h1 className="text-xl font-bold">
                            {loadingTwo ? <Loader /> : orders?.totalOrders}
                        </h1>
                    </div>
                </div>

                {/* Chart Type Selector */}
                <div className="w-full flex justify-center mt-6">
                    <select
                        className="p-2 border rounded bg-gray-700 text-lg text-white"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="donut">Donut</option>
                        <option value="pie">Pie</option>
                        <option value="area">Area</option>
                        <option value="radar">Radar</option>
                        <option value="scatter">Scatter</option>
                        <option value="heatmap">Heatmap</option>
                        <option value="bar">Bar</option>
                    </select>
                </div>

                {/* Chart Section */}
                <div className="w-full flex justify-center mt-12">
                    <div className="w-full md:w-[80%] lg:w-[70%] p-6 rounded-lg shadow-sm border">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type={chartType} // Dynamic chart type
                            height={350}
                        />
                    </div>
                </div>

                {/* Order List Section */}
                <div className="mt-12">
                    <OrderList />
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;
