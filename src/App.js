import React, { useState } from 'react';

function App() {
  const [gstNo, setGstNo] = useState('');
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    setDetails({});

    try {
      const res = await fetch('http://localhost:3001/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gstNo })
      });

      const data = await res.json();
      if (data.error) {
        setError(data.message || 'Something went wrong');
      } else {
        setDetails(data);
      }
    } catch (err) {
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value || '');
  };

  const renderField = (label, value) => (
    <div className="mb-3">
      <strong>{label}:</strong> {value || '—'}
      <button
        onClick={() => copyToClipboard(value)}
        className="ml-2 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Copy
      </button>
    </div>
  );

  const {
    gstin, legalName, tradeName, status, constitutionOfBusiness,
    dateOfRegistration, lastUpdated, typeOfTaxpayer, jurisdiction,
    jurisdictionCode, stateJurisdiction, stateJurisdictionCode,
    natureOfBusiness, filingFrequency, lastReturnFiled, address = {}
  } = details;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">GST Verification</h1>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={gstNo}
          onChange={(e) => setGstNo(e.target.value)}
          placeholder="Enter GST Number"
          className="w-full p-3 mb-4 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? 'Fetching...' : 'Fetch Details'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {gstin && (
          <div className="mt-6 text-sm">
            {renderField('GSTIN', gstin)}
            {renderField('Legal Name', legalName)}
            {renderField('Trade Name', tradeName)}
            {renderField('Status', status)}
            {renderField('Constitution of Business', constitutionOfBusiness)}
            {renderField('Date of Registration', dateOfRegistration)}
            {renderField('Last Updated', lastUpdated)}
            {renderField('Type of Taxpayer', typeOfTaxpayer)}
            {renderField('Jurisdiction', jurisdiction)}
            {renderField('Jurisdiction Code', jurisdictionCode)}
            {renderField('State Jurisdiction', stateJurisdiction)}
            {renderField('State Jurisdiction Code', stateJurisdictionCode)}
            {renderField('Nature of Business', natureOfBusiness)}
            {renderField('Filing Frequency', filingFrequency)}
            {renderField('Last Return Filed', lastReturnFiled)}

            <h3 className="mt-4 font-semibold">Address Details</h3>
            {renderField('Building No', address.buildingNo)}
            {renderField('Street', address.street)}
            {renderField('Locality', address.locality)}
            {renderField('District', address.district)}
            {renderField('State', address.state)}
            {renderField('Pincode', address.pincode)}
            {renderField('Flat No', address.flatNo)}
            {renderField('Landmark', address.landmark)}
            {renderField('Building Name', address.buildingName)}
            {renderField('City', address.city)}
            {renderField('Latitude', address.latitude)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;