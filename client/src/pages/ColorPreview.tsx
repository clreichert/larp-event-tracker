import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PARTY_COLORS = [
  {
    name: 'Arden',
    description: 'Forest Green',
    bg: 'bg-emerald-100 dark:bg-emerald-950',
    text: 'text-emerald-900 dark:text-emerald-100',
    border: 'border-emerald-500'
  },
  {
    name: 'Clairia',
    description: 'White',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-900 dark:text-slate-100',
    border: 'border-slate-400 dark:border-slate-500'
  },
  {
    name: "P'Loa",
    description: 'Teal',
    bg: 'bg-teal-100 dark:bg-teal-950',
    text: 'text-teal-900 dark:text-teal-100',
    border: 'border-teal-500'
  },
  {
    name: 'Uri-Kesh',
    description: 'Red',
    bg: 'bg-red-100 dark:bg-red-950',
    text: 'text-red-900 dark:text-red-100',
    border: 'border-red-500'
  },
  {
    name: 'Doloron',
    description: 'Pink',
    bg: 'bg-pink-100 dark:bg-pink-950',
    text: 'text-pink-900 dark:text-pink-100',
    border: 'border-pink-500'
  },
  {
    name: 'Sythwan',
    description: 'Golden Yellow',
    bg: 'bg-yellow-100 dark:bg-yellow-950',
    text: 'text-yellow-900 dark:text-yellow-100',
    border: 'border-yellow-500'
  },
  {
    name: 'Noctara',
    description: 'Purple',
    bg: 'bg-purple-100 dark:bg-purple-950',
    text: 'text-purple-900 dark:text-purple-100',
    border: 'border-purple-500'
  },
  {
    name: 'Keer',
    description: 'Light Blue',
    bg: 'bg-blue-100 dark:bg-blue-950',
    text: 'text-blue-900 dark:text-blue-100',
    border: 'border-blue-500'
  },
  {
    name: 'Waylon',
    description: 'Orange',
    bg: 'bg-orange-100 dark:bg-orange-950',
    text: 'text-orange-900 dark:text-orange-100',
    border: 'border-orange-500'
  },
  {
    name: 'Elsewhich',
    description: 'Gray',
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    border: 'border-gray-500'
  },
  {
    name: 'Glendeep',
    description: 'Seafoam Green',
    bg: 'bg-cyan-100 dark:bg-cyan-950',
    text: 'text-cyan-900 dark:text-cyan-100',
    border: 'border-cyan-500'
  }
];

export default function ColorPreview() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">Party Color Swatches</h1>
        <p className="text-muted-foreground">Preview of color schemes for each party</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PARTY_COLORS.map((party) => (
          <Card key={party.name}>
            <CardHeader>
              <CardTitle>{party.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{party.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Badge Style</p>
                <Badge className={`${party.bg} ${party.text} border ${party.border}`}>
                  {party.name}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Card Header Background</p>
                <div className={`p-4 rounded-md ${party.bg} ${party.text} border-l-4 ${party.border}`}>
                  <p className="font-semibold">{party.name}</p>
                  <p className="text-sm opacity-80">Sample party card with colored accent</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">List Item with Left Border</p>
                <div className={`p-3 rounded-md bg-card border-l-4 ${party.border}`}>
                  <p className="text-sm">{party.name} in party list</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Inline Party Name</p>
                <p className="text-sm">
                  Party: <span className={`font-semibold ${party.text}`}>{party.name}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Usage Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• These colors will be applied to party cards on the dashboard</p>
          <p>• Party names throughout the app will use their designated colors</p>
          <p>• Color accents (left borders) will help quickly identify parties</p>
          <p>• All colors have dark mode variants for consistency</p>
        </CardContent>
      </Card>
    </div>
  );
}
