import { useState } from 'react';
import { Camera, Car, MapPin, Users } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    chapa: '',
    veiculo: '',
    chassi: '',
    rota: '',
    alunos: '',
    kmInicial: '',
    kmParada1: '',
    kmParada2: '',
    kmFinal: '',
    confirmacao: false
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.confirmacao) {
      alert('Por favor, confirme que as informações são verídicas.');
      return;
    }
    console.log('Dados enviados:', formData);
    alert('Registro de viagem enviado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-8 py-6">
            <div className="flex items-center gap-3">
              <Car className="text-primary-foreground" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">Controle de Frota</h1>
                <p className="text-primary-foreground/70 text-sm">Registro de Viagem</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Foto do Motorista */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-muted border-4 border-border flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Motorista" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-muted-foreground" size={40} />
                  )}
                </div>
                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer transition-colors shadow-lg">
                  <Camera size={20} />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Foto do Motorista</p>
            </div>

            {/* Informações do Veículo */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Car size={20} className="text-primary" />
                Informações do Veículo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Chapa
                  </label>
                  <input
                    type="text"
                    name="chapa"
                    value={formData.chapa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="Ex: 001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Veículo
                  </label>
                  <input
                    type="text"
                    name="veiculo"
                    value={formData.veiculo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="Ex: ABC-1234"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Chassi
                  </label>
                  <input
                    type="text"
                    name="chassi"
                    value={formData.chassi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="Ex: 9BWZZZ377VT004251"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Rota e Alunos */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                Rota e Passageiros
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Rota
                  </label>
                  <input
                    type="text"
                    name="rota"
                    value={formData.rota}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="Ex: Centro - Zona Norte"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users size={16} />
                    Alunos
                  </label>
                  <input
                    type="number"
                    name="alunos"
                    value={formData.alunos}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="Ex: 25"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Quilometragem */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Quilometragem
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    KM Inicial
                  </label>
                  <input
                    type="number"
                    name="kmInicial"
                    value={formData.kmInicial}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="0000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    KM Parada 1
                  </label>
                  <input
                    type="number"
                    name="kmParada1"
                    value={formData.kmParada1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    KM Parada 2
                  </label>
                  <input
                    type="number"
                    name="kmParada2"
                    value={formData.kmParada2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    KM Final
                  </label>
                  <input
                    type="number"
                    name="kmFinal"
                    value={formData.kmFinal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all bg-input-background text-foreground"
                    placeholder="0000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Confirmação */}
            <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="confirmacao"
                  checked={formData.confirmacao}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 rounded border-border focus:ring-2 focus:ring-ring accent-primary"
                  required
                />
                <span className="text-sm text-foreground font-medium">
                  Eu confirmo que todas as informações citadas são de origem verídica.
                </span>
              </label>
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:opacity-90"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
