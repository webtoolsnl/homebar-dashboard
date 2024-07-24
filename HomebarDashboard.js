import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const initialData = [
  { maand: 'Aug 24', gemOrderwaarde: 80.65, totaalBlogArtikelen: 5, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Sep 24', gemOrderwaarde: 80.65, totaalBlogArtikelen: 10, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Okt 24', gemOrderwaarde: 80.65, totaalBlogArtikelen: 15, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Nov 24', gemOrderwaarde: 80.65, totaalBlogArtikelen: 20, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Dec 24', gemOrderwaarde: 80.65, totaalBlogArtikelen: 25, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Jan 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 30, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Feb 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 35, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Mrt 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 40, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Apr 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 45, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Mei 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 50, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Jun 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 55, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Jul 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 60, schoneWinstPerProduct: 50, conversieRatio: 2 },
  { maand: 'Aug 25', gemOrderwaarde: 80.65, totaalBlogArtikelen: 65, schoneWinstPerProduct: 50, conversieRatio: 2 }
];

const BTW_PERCENTAGE = 0.21;
const BEZOEKERS_PER_BLOG = 130;

const calculateKPIs = (data) => {
  let totalWinst = 0;
  return data.map((month) => {
    const bezoekersAantal = month.totaalBlogArtikelen * BEZOEKERS_PER_BLOG;
    const verkopen = Math.round(bezoekersAantal * (month.conversieRatio / 100));
    const omzetInclBTW = verkopen * month.gemOrderwaarde;
    const omzetExclBTW = omzetInclBTW / (1 + BTW_PERCENTAGE);
    const btwBedrag = omzetInclBTW - omzetExclBTW;
    const winstMaand = verkopen * month.schoneWinstPerProduct;
    totalWinst += winstMaand;
    return { 
      ...month, 
      bezoekersAantal,
      verkopen,
      omzetInclBTW, 
      omzetExclBTW, 
      btwBedrag, 
      winstMaand,
      totalWinst
    };
  });
};

const HomebarDashboard = () => {
  const [data, setData] = useState(calculateKPIs(initialData));
  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleInputChange = (index, key, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [key]: parseFloat(value) || 0 };
    setData(calculateKPIs(newData));
  };

  const resetData = () => {
    setData(calculateKPIs(initialData));
    setSelectedMonth(0);
  };

  const currentMonth = data[selectedMonth];
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remainingDays = daysInMonth - today.getDate();

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-yellow-700">Homebar 2.0 Dashboard</h1>
        <div className="text-right">
          <button onClick={resetData} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2">
            Reset
          </button>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-green-600 mb-2">TOTALE WINST TOT NU TOE</h2>
            <p className="text-2xl font-bold">€{currentMonth.totalWinst.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="text-left mb-4">
        <p>Datum van vandaag: {today.toLocaleDateString()}</p>
        <p>Deze maand telt nog {remainingDays} dagen</p>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-700">"Succes is een keuze"</h2>
        <a href="https://drive.google.com/file/d/10_FdSg5D-3Xg3wfItVEG2geP_vsBUDF2/view?usp=sharing" 
           target="_blank" 
           rel="noopener noreferrer"
           className="text-blue-600 hover:text-blue-800">
          Bekijk Homebar 2.0 Plan op Google Drive
        </a>
      </div>

      <div className="mb-4">
        <label htmlFor="month-select" className="block font-semibold mb-2">Selecteer Maand:</label>
        <input
          type="range"
          id="month-select"
          min="0"
          max={data.length - 1}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="w-full"
        />
        <p className="text-center mt-2">{currentMonth.maand}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-yellow-700">Marketing KPI's</h3>
          <p className="mb-2">Bezoekers: Aantal unieke bezoekers op de website - {currentMonth.bezoekersAantal}</p>
          <p className="mb-2">Conversie Ratio: Percentage bezoekers dat een aankoop doet</p>
          <input
            type="number"
            value={currentMonth.conversieRatio}
            onChange={(e) => handleInputChange(selectedMonth, "conversieRatio", e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Conversie Ratio (%)"
          />
          <p className="mb-2">Totaal aantal blog artikelen: Cumulatief aantal gepubliceerde artikelen (130 bezoekers per blog gemiddeld)</p>
          <input
            type="number"
            value={currentMonth.totaalBlogArtikelen}
            onChange={(e) => handleInputChange(selectedMonth, "totaalBlogArtikelen", e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Totaal aantal blog artikelen"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-yellow-700">Sales KPI's</h3>
          <p className="mb-2">Verkopen: Aantal verkochte producten</p>
          <input
            type="number"
            value={currentMonth.verkopen}
            readOnly
            className="w-full p-2 mb-2 border rounded bg-gray-100"
            placeholder="Verkopen"
          />
          <p className="mb-2">Gem. Orderwaarde: Gemiddelde waarde per bestelling</p>
          <input
            type="number"
            value={currentMonth.gemOrderwaarde}
            onChange={(e) => handleInputChange(selectedMonth, "gemOrderwaarde", e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Gem. Orderwaarde (€)"
          />
          <p className="mb-2">Schone Winst per Product: Winst per verkocht product na aftrek van kosten</p>
          <input
            type="number"
            value={currentMonth.schoneWinstPerProduct}
            onChange={(e) => handleInputChange(selectedMonth, "schoneWinstPerProduct", e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Schone Winst per Product (€)"
          />
          <p className="mb-2 text-green-600">Omzet deze maand (incl. BTW): €{currentMonth.omzetInclBTW.toFixed(2)}</p>
          <p className="mb-2 text-green-600">Omzet deze maand (excl. BTW): €{currentMonth.omzetExclBTW.toFixed(2)}</p>
          <p className="mb-2 text-green-600">Winst deze maand: €{currentMonth.winstMaand.toFixed(2)}</p>
          <p className="mb-2 text-green-600">Af te dragen BTW: €{currentMonth.btwBedrag.toFixed(2)}</p>
        </div>
      </div>

      <BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="verkopen" fill="#8884d8" />
        <Bar dataKey="winstMaand" fill="#82ca9d" />
        <Bar dataKey="btwBedrag" fill="#ffc658" />
      </BarChart>

      <h3 className="text-xl font-semibold text-center text-yellow-700 my-4">Originele KPI's</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border p-2">Maand</th>
              <th className="border p-2">Verkopen</th>
              <th className="border p-2">Bezoekers</th>
              <th className="border p-2">Conversie Ratio (%)</th>
              <th className="border p-2">Gem. Orderwaarde (€)</th>
              <th className="border p-2">Schone Winst per Product (€)</th>
              <th className="border p-2">Totaal aantal blog artikelen</th>
              <th className="border p-2">Omzet (incl. BTW) (€)</th>
              <th className="border p-2">Omzet (excl. BTW) (€)</th>
              <th className="border p-2">BTW Bedrag (€)</th>
              <th className="border p-2">Winst (€)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index === selectedMonth ? 'bg-yellow-200' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">{item.maand}</td>
                <td className="border p-2">{item.verkopen}</td>
                <td className="border p-2">{item.bezoekersAantal}</td>
                <td className="border p-2">{item.conversieRatio.toFixed(2)}</td>
                <td className="border p-2">{item.gemOrderwaarde.toFixed(2)}</td>
                <td className="border p-2">{item.schoneWinstPerProduct.toFixed(2)}</td>
                <td className="border p-2">{item.totaalBlogArtikelen}</td>
                <td className="border p-2">{item.omzetInclBTW.toFixed(2)}</td>
                <td className="border p-2">{item.omzetExclBTW.toFixed(2)}</td>
                <td className="border p-2">{item.btwBedrag.toFixed(2)}</td>
                <td className="border p-2">{item.winstMaand.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomebarDashboard;
