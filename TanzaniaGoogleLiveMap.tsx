import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Globe,
  MapPin,
  ExternalLink,
  Layers,
  Compass,
  Navigation,
  Sparkles,
  Mountain,
  Factory,
  Train,
  Ship,
  Eye,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  RefreshCw,
  Info,
  Building,
} from 'lucide-react';
import {
  ALL_31_TANZANIA_REGIONS,
  TANZANIA_PHYSICAL_FEATURES,
  TANZANIA_INDUSTRIAL_HUBS,
  TANZANIA_TRANSPORT_NODES,
} from '../../data/tanzaniaGeographyData';

const GOOGLE_MAPS_SHORTLINK = 'https://maps.app.goo.gl/a8tTY5EZuYK2i6TW6';
const TANZANIA_CENTER: [number, number] = [-6.369028, 34.888822];

type BaseLayerType = 'osm' | 'satellite' | 'topo' | 'carto';

export const TanzaniaGoogleLiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeBaseLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [baseLayer, setBaseLayer] = useState<BaseLayerType>('satellite');
  const [showRegions, setShowRegions] = useState(true);
  const [showPhysical, setShowPhysical] = useState(true);
  const [showIndustry, setShowIndustry] = useState(true);
  const [showTransport, setShowTransport] = useState(true);
  const [embedMode, setEmbedMode] = useState<'leaflet' | 'iframe'>('leaflet');

  const [selectedPinInfo, setSelectedPinInfo] = useState<{
    name: string;
    category: string;
    lat: number;
    lng: number;
    description: string;
    metric?: string;
  } | null>({
    name: 'Geographic Center of Tanzania',
    category: 'National Geographic Datum',
    lat: -6.369028,
    lng: 34.888822,
    description:
      'The exact centroid of the United Republic of Tanzania referenced in the Google Maps link (6°22\'08.5"S 34°53\'19.8"E), located in Central Tanzania near the capital city of Dodoma.',
    metric: 'Elevation: ~1,120 m above sea level | Datum: WGS 84',
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [clickedCoord, setClickedCoord] = useState<{ lat: number; lng: number } | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (embedMode !== 'leaflet') return;
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: TANZANIA_CENTER,
      zoom: 6,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 18,
    });

    mapInstanceRef.current = map;

    // Tile Layers
    const tileLayers: Record<BaseLayerType, { url: string; attribution: string; maxZoom?: number }> = {
      osm: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap contributors',
      },
      satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
      },
      topo: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
        maxZoom: 17,
      },
      carto: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      },
    };

    const currentTile = tileLayers[baseLayer];
    const initialTileLayer = L.tileLayer(currentTile.url, {
      attribution: currentTile.attribution,
      maxZoom: currentTile.maxZoom || 19,
    }).addTo(map);

    activeBaseLayerRef.current = initialTileLayer;

    // Layer group for dynamic markers
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerGroupRef.current = markersGroup;

    // Add map click listener
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setClickedCoord({ lat, lng });

      // Calculate approximate distance to Dodoma (-6.1630, 35.7516)
      const dLat = (lat - -6.163) * 111;
      const dLng = (lng - 35.7516) * 111 * Math.cos((lat * Math.PI) / 180);
      const distDodoma = Math.round(Math.sqrt(dLat * dLat + dLng * dLng));

      setSelectedPinInfo({
        name: `Map Coordinate (${lat.toFixed(4)}°, ${lng.toFixed(4)}°)`,
        category: 'Inspected GPS Location',
        lat,
        lng,
        description: `Inspected geographic coordinate in East Africa. Approximate straight-line distance to national capital (Dodoma): ${distDodoma} km.`,
        metric: `Latitude: ${lat.toFixed(6)}° | Longitude: ${lng.toFixed(6)}°`,
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [embedMode]);

  // Update Base Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (activeBaseLayerRef.current) {
      map.removeLayer(activeBaseLayerRef.current);
    }

    const tileConfigs: Record<BaseLayerType, { url: string; attribution: string; maxZoom?: number }> = {
      osm: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap contributors',
      },
      satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; High-Resolution Earth Observation Imagery',
        maxZoom: 18,
      },
      topo: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenTopoMap contributors',
        maxZoom: 17,
      },
      carto: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '&copy; CARTO Voyager',
      },
    };

    const cfg = tileConfigs[baseLayer];
    const newLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom || 19,
    }).addTo(map);

    activeBaseLayerRef.current = newLayer;
  }, [baseLayer]);

  // Update Markers when layers or toggles change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerGroupRef.current) return;
    const markersGroup = markersLayerGroupRef.current;
    markersGroup.clearLayers();

    // 1. Google Link Centerpoint Pin
    const centerIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="background-color: #ef4444; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
          ★
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const centerMarker = L.marker(TANZANIA_CENTER, { icon: centerIcon })
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; color: #0f172a; line-height: 1.4;">
          <b style="color: #0A3D62; font-size: 14px;">Tanzania Center (-6.3690°, 34.8888°)</b><br/>
          <span style="color: #dc2626; font-weight: bold;">Google Maps Location</span><br/>
          Direct link: <a href="${GOOGLE_MAPS_SHORTLINK}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">maps.app.goo.gl/a8tTY5EZuYK2i6TW6</a>
        </div>
      `)
      .addTo(markersGroup);

    centerMarker.on('click', () => {
      setSelectedPinInfo({
        name: 'Tanzania Google Maps Anchor Point',
        category: 'Google Maps Link Location',
        lat: TANZANIA_CENTER[0],
        lng: TANZANIA_CENTER[1],
        description:
          'Direct geographic location specified in the Google Maps URL: https://maps.app.goo.gl/a8tTY5EZuYK2i6TW6. Central coordinates: -6.369028, 34.888822.',
        metric: 'Reference Code: a8tTY5EZuYK2i6TW6',
      });
    });

    // 2. 31 Regions
    if (showRegions) {
      // Coordinates lookup for major regional capitals
      const regionCoords: Record<string, [number, number]> = {
        'Dar es Salaam': [-6.8235, 39.2695],
        'Dodoma': [-6.1630, 35.7516],
        'Arusha': [-3.3667, 36.6833],
        'Kilimanjaro': [-3.3333, 37.3333],
        'Mwanza': [-2.5167, 32.9000],
        'Tanga': [-5.0667, 39.1000],
        'Morogoro': [-6.8278, 37.6591],
        'Mbeya': [-8.9094, 33.4608],
        'Kigoma': [-4.8833, 29.6333],
        'Tabora': [-5.0167, 32.8000],
        'Kagera': [-1.3265, 31.8123],
        'Iringa': [-7.7667, 35.7000],
        'Ruvuma': [-10.6833, 35.6500],
        'Mtwara': [-10.2736, 40.1828],
        'Lindi': [-9.9969, 39.7144],
        'Shinyanga': [-3.6639, 33.4219],
        'Mara': [-1.5000, 33.8000],
        'Manyara': [-4.2167, 35.7500],
        'Singida': [-4.8167, 34.7500],
        'Rukwa': [-7.9667, 31.6167],
        'Katavi': [-6.3667, 31.1333],
        'Geita': [-2.8667, 32.2333],
        'Simiyu': [-2.8333, 34.0000],
        'Njombe': [-9.3333, 34.7667],
        'Songwe': [-8.9333, 32.8667],
        'Zanzibar Urban/West': [-6.1659, 39.2026],
        'Zanzibar North': [-5.9167, 39.3000],
        'Zanzibar South': [-6.3333, 39.4167],
        'Pemba North': [-5.0500, 39.7667],
        'Pemba South': [-5.2667, 39.7667],
      };

      ALL_31_TANZANIA_REGIONS.forEach((region) => {
        const coords = regionCoords[region.name];
        if (!coords) return;

        const regIcon = L.divIcon({
          className: 'custom-region-icon',
          html: `
            <div style="background-color: #0A3D62; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #F5E8C7; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"></div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker(coords, { icon: regIcon })
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; color: #0f172a;">
              <b style="color: #0A3D62; font-size: 13px;">${region.name} Region</b><br/>
              <b>Capital:</b> ${region.capital}<br/>
              <b>Population:</b> ${region.populationApprox || 'N/A'}<br/>
              <b>Districts:</b> ${region.districts.length} (${region.districts.slice(0, 3).join(', ')}...)<br/>
              <b>Key Economy:</b> ${region.majorEconomicActivities?.slice(0, 2).join(', ') || 'Commerce'}<br/>
              <span style="font-size: 10px; color: #64748b;">Zone: ${region.zone}</span>
            </div>
          `)
          .addTo(markersGroup);

        marker.on('click', () => {
          setSelectedPinInfo({
            name: `${region.name} Region`,
            category: `Administrative Region (${region.zone} Zone)`,
            lat: coords[0],
            lng: coords[1],
            description: region.geographicalImportance || region.nectaExamFact,
            metric: `Capital: ${region.capital} | Pop: ${region.populationApprox || 'N/A'} | Area: ${region.areaKm2 ? region.areaKm2.toLocaleString() : 'N/A'} km²`,
          });
        });
      });
    }

    // 3. Physical Features (Mountains, Lakes, Rift Valley)
    if (showPhysical) {
      const physicalPoints: Array<{
        name: string;
        coords: [number, number];
        category: string;
        metric: string;
        desc: string;
      }> = [
        {
          name: 'Mount Kilimanjaro',
          coords: [-3.0674, 37.3556],
          category: 'Physical Landform (Roof of Africa)',
          metric: '5,895 m (Highest Peak in Africa)',
          desc: 'Dormant stratovolcano with three volcanic cones (Kibo, Mawenzi, Shira). Free-standing continental giant in northern Tanzania.',
        },
        {
          name: 'Lake Victoria',
          coords: [-1.5000, 33.0000],
          category: 'Hydrosphere (African Great Lake)',
          metric: 'Area: 68,800 km² (Largest Lake in Africa)',
          desc: 'Second-largest freshwater lake in the world by surface area. Shared between Tanzania (49%), Uganda (45%), and Kenya (6%).',
        },
        {
          name: 'Lake Tanganyika',
          coords: [-5.0000, 29.5000],
          category: 'Hydrosphere (Rift Valley Trench)',
          metric: 'Depth: 1,470 m (2nd Deepest Lake on Earth)',
          desc: 'Longest freshwater lake in the world (673 km) situated in the Western Albertine Branch of the East African Rift.',
        },
        {
          name: 'Ngorongoro Crater',
          coords: [-3.2422, 35.5866],
          category: 'Volcanic Geomorphology',
          metric: 'Caldera Floor: 260 km² | Depth: 610 m',
          desc: 'The world\'s largest intact, unfilled volcanic caldera. Formed when a massive volcano exploded and collapsed on itself two to three million years ago.',
        },
        {
          name: 'Serengeti Ecosystem',
          coords: [-2.3333, 34.8333],
          category: 'Savannah Biome',
          metric: 'Area: 14,763 km² | 1.5M Wildebeest',
          desc: 'World-renowned ecosystem hosting the greatest terrestrial mammal migration on Earth through Tanzania and the Maasai Mara.',
        },
        {
          name: 'Lake Nyasa (Lake Malawi)',
          coords: [-10.0000, 34.5000],
          category: 'African Great Lake',
          metric: 'Depth: 706 m | 1,000+ Cichlid Species',
          desc: 'Meromictic rift lake in southern Tanzania holding 7% of world available surface freshwater.',
        },
        {
          name: 'Ol Doinyo Lengai',
          coords: [-2.7642, 35.9142],
          category: 'Active Volcanism',
          metric: '2,962 m | Natrocarbonatite Lava',
          desc: 'The "Mountain of God" in Maasai. The only active volcano on Earth producing black/brown natrocarbonatite lava that erupts at only 510°C.',
        },
      ];

      physicalPoints.forEach((p) => {
        const icon = L.divIcon({
          className: 'custom-phys-icon',
          html: `
            <div style="background-color: #10b981; width: 18px; height: 18px; border-radius: 4px; transform: rotate(45deg); border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
              <span style="transform: rotate(-45deg); font-size: 9px; color: white;">▲</span>
            </div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        const marker = L.marker(p.coords, { icon })
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; color: #0f172a;">
              <b style="color: #065f46; font-size: 13px;">${p.name}</b><br/>
              <b>${p.category}</b><br/>
              <span style="color: #0284c7; font-weight: bold;">${p.metric}</span><br/>
              <p style="margin-top: 4px; font-size: 11px;">${p.desc}</p>
            </div>
          `)
          .addTo(markersGroup);

        marker.on('click', () => {
          setSelectedPinInfo({
            name: p.name,
            category: p.category,
            lat: p.coords[0],
            lng: p.coords[1],
            description: p.desc,
            metric: p.metric,
          });
        });
      });
    }

    // 4. Industrial Megaprojects
    if (showIndustry) {
      const industryPoints: Array<{
        name: string;
        coords: [number, number];
        category: string;
        metric: string;
        desc: string;
      }> = [
        {
          name: 'Julius Nyerere Hydropower Dam (JNHPP)',
          coords: [-7.8000, 37.8500],
          category: 'Renewable Hydroelectric Energy',
          metric: 'Installed Capacity: 2,115 MW ($2.9 Billion)',
          desc: 'Mega-dam across the Rufiji River at Stiegler\'s Gorge. Generates over 5,900 GWh annually, transforming Tanzania into an East African clean energy powerhouse.',
        },
        {
          name: 'Songo Songo Gas & Energy Complex',
          coords: [-8.5333, 39.5000],
          category: 'Natural Gas Extraction & Pipelines',
          metric: '1.2 Trillion Cubic Feet (TCF) Proven Gas',
          desc: 'Offshore gas extraction supplying the 532-km pipeline to Dar es Salaam thermal power stations (Ubungo, Kinyerezi).',
        },
        {
          name: 'Geita Gold Mining Hub',
          coords: [-2.8667, 32.2333],
          category: 'Mineral Wealth & Precious Metals',
          metric: 'Annual Output: ~500,000+ Troy Ounces Gold',
          desc: 'One of Africa\'s premier open-pit and underground gold complexes situated in the Lake Victoria Greenstone Belt.',
        },
        {
          name: 'Williamson Diamond Mine (Mwadui)',
          coords: [-3.5167, 33.6000],
          category: 'Kimberlite Diamond Pipe',
          metric: 'World\'s Largest Diamond Kimberlite (146 ha)',
          desc: 'Continuous operation since 1940, famous for producing rare and valuable high-clarity pink diamonds.',
        },
      ];

      industryPoints.forEach((ind) => {
        const icon = L.divIcon({
          className: 'custom-ind-icon',
          html: `
            <div style="background-color: #f59e0b; width: 18px; height: 18px; border-radius: 4px; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 10px; color: white;">
              ⚙
            </div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        const marker = L.marker(ind.coords, { icon })
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; color: #0f172a;">
              <b style="color: #92400e; font-size: 13px;">${ind.name}</b><br/>
              <b>${ind.category}</b><br/>
              <span style="color: #b45309; font-weight: bold;">${ind.metric}</span><br/>
              <p style="margin-top: 4px; font-size: 11px;">${ind.desc}</p>
            </div>
          `)
          .addTo(markersGroup);

        marker.on('click', () => {
          setSelectedPinInfo({
            name: ind.name,
            category: ind.category,
            lat: ind.coords[0],
            lng: ind.coords[1],
            description: ind.desc,
            metric: ind.metric,
          });
        });
      });
    }

    // 5. Transportation Infrastructure & Corridors
    if (showTransport) {
      const transportPoints: Array<{
        name: string;
        coords: [number, number];
        category: string;
        metric: string;
        desc: string;
      }> = [
        {
          name: 'Port of Dar es Salaam',
          coords: [-6.8286, 39.2972],
          category: 'Maritime Gateway (Indian Ocean)',
          metric: 'Handling >90% of Tanzania Maritime Commerce',
          desc: 'Premier transshipment ocean port serving six landlocked African neighbors: Zambia, DRC, Rwanda, Burundi, Uganda, and Malawi.',
        },
        {
          name: 'Standard Gauge Railway (SGR) Central Line',
          coords: [-6.8167, 39.2833],
          category: 'Modern Electric Transit Rail',
          metric: '160 km/h Passenger Trains (Dar - Morogoro - Dodoma)',
          desc: 'High-speed standard gauge rail corridor modernizing East African transit, linking Indian Ocean to Lake Victoria and Burundi.',
        },
        {
          name: 'TAZARA Railway Corridor',
          coords: [-9.3500, 32.7667],
          category: 'Bi-National Trans-African Rail',
          metric: '1,860 km Length (Dar es Salaam to Kapiri Mposhi, Zambia)',
          desc: 'Historic "Uhuru Railway" built in 1970-1975 providing Zambia copper access to Dar es Salaam ocean port.',
        },
        {
          name: 'Tanga Deepwater Port',
          coords: [-5.0667, 39.1000],
          category: 'Crude Oil & Industrial Terminal',
          metric: 'EACOP Pipeline Ocean Terminal (Chongoleani)',
          desc: 'Northern maritime terminal for the 1,443 km East African Crude Oil Pipeline originating from Lake Albert in Uganda.',
        },
        {
          name: 'Mtwara Deepwater Port',
          coords: [-10.2736, 40.1828],
          category: 'Southern Development Corridor',
          metric: 'Natural Deep-Water Harbour (Draft: 11.5 m)',
          desc: 'Strategic port supporting offshore gas exploration, cashew nut logistics, and coal/iron exports.',
        },
      ];

      transportPoints.forEach((tr) => {
        const icon = L.divIcon({
          className: 'custom-tr-icon',
          html: `
            <div style="background-color: #38bdf8; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 10px; color: #0f172a; font-weight: bold;">
              ⚓
            </div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        const marker = L.marker(tr.coords, { icon })
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; color: #0f172a;">
              <b style="color: #0369a1; font-size: 13px;">${tr.name}</b><br/>
              <b>${tr.category}</b><br/>
              <span style="color: #0284c7; font-weight: bold;">${tr.metric}</span><br/>
              <p style="margin-top: 4px; font-size: 11px;">${tr.desc}</p>
            </div>
          `)
          .addTo(markersGroup);

        marker.on('click', () => {
          setSelectedPinInfo({
            name: tr.name,
            category: tr.category,
            lat: tr.coords[0],
            lng: tr.coords[1],
            description: tr.desc,
            metric: tr.metric,
          });
        });
      });
    }
  }, [showRegions, showPhysical, showIndustry, showTransport, baseLayer]);

  // Fly to helper
  const handleFlyTo = (coords: [number, number], zoom = 10, label = 'Location') => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, zoom, {
        duration: 1.5,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(GOOGLE_MAPS_SHORTLINK);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Direct Google Maps Link Integration */}
      <div className="bg-gradient-to-r from-[#0A3D62] via-[#09416a] to-[#0A3D62] text-white rounded-3xl p-6 sm:p-8 border border-[#0A3D62] shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#F5E8C7] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#2ECC71]" />
              Live GIS Satellite &amp; Google Maps Integration
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              Tanzania Google Maps Live View &amp; Satellite GIS
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Direct display and interactive exploration of Tanzania linked to{' '}
              <strong className="text-[#F5E8C7]">maps.app.goo.gl/a8tTY5EZuYK2i6TW6</strong>.
              Seamlessly inspect real-time high-resolution satellite imagery, administrative regions,
              topography, and infrastructure megaprojects.
            </p>
          </div>

          {/* Action Card with Link */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 space-y-3 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#F5E8C7]" />
                Google Maps Anchor
              </span>
              <span className="font-mono text-emerald-300 text-[11px]">-6.3690°, 34.8888°</span>
            </div>

            <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-[#F5E8C7] truncate select-all">
                {GOOGLE_MAPS_SHORTLINK}
              </span>
              <button
                onClick={copyToClipboard}
                title="Copy link to clipboard"
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={GOOGLE_MAPS_SHORTLINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => handleFlyTo(TANZANIA_CENTER, 6, 'Tanzania Center')}
                className="bg-white/15 hover:bg-white/25 text-white p-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
                title="Reset Map to Tanzania Center"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Control Bar & Quick Navigator */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Layer Controls & Mode Switcher */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Base Layer Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
              <Layers className="w-4 h-4 text-[#0A3D62]" />
              Base Imagery:
            </span>

            <button
              onClick={() => setBaseLayer('satellite')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                baseLayer === 'satellite'
                  ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              🛰️ Esri Satellite (True Color)
            </button>

            <button
              onClick={() => setBaseLayer('osm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                baseLayer === 'osm'
                  ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              🗺️ OpenStreetMap (Roads)
            </button>

            <button
              onClick={() => setBaseLayer('topo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                baseLayer === 'topo'
                  ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              ⛰️ Topo Relief (Contours)
            </button>

            <button
              onClick={() => setBaseLayer('carto')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                baseLayer === 'carto'
                  ? 'bg-[#0A3D62] text-white border-[#0A3D62] shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              📐 Clean Atlas (Carto)
            </button>
          </div>

          {/* Feature Overlays Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowRegions(!showRegions)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border flex items-center gap-1.5 ${
                showRegions
                  ? 'bg-sky-50 text-sky-900 border-sky-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-sky-600" />
              <span>31 Regions</span>
            </button>

            <button
              onClick={() => setShowPhysical(!showPhysical)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border flex items-center gap-1.5 ${
                showPhysical
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-emerald-600" />
              <span>Physical Wonders</span>
            </button>

            <button
              onClick={() => setShowIndustry(!showIndustry)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border flex items-center gap-1.5 ${
                showIndustry
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Factory className="w-3.5 h-3.5 text-amber-600" />
              <span>Megaprojects</span>
            </button>

            <button
              onClick={() => setShowTransport(!showTransport)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border flex items-center gap-1.5 ${
                showTransport
                  ? 'bg-indigo-50 text-indigo-900 border-indigo-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <Ship className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ports &amp; SGR</span>
            </button>
          </div>
        </div>

        {/* Quick Fly-To Locations */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            Quick Teleport:
          </span>

          <button
            onClick={() => handleFlyTo([-6.369028, 34.888822], 6, 'Tanzania Overview')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            🇹🇿 National View
          </button>
          <button
            onClick={() => handleFlyTo([-6.8235, 39.2695], 11, 'Dar es Salaam')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            🏙️ Dar es Salaam
          </button>
          <button
            onClick={() => handleFlyTo([-6.1630, 35.7516], 11, 'Dodoma Capital')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            🏛️ Dodoma (Capital)
          </button>
          <button
            onClick={() => handleFlyTo([-3.0674, 37.3556], 11, 'Mount Kilimanjaro')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            🏔️ Mount Kilimanjaro
          </button>
          <button
            onClick={() => handleFlyTo([-6.1659, 39.2026], 11, 'Zanzibar Island')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            🏝️ Zanzibar
          </button>
          <button
            onClick={() => handleFlyTo([-2.5167, 32.9000], 11, 'Mwanza')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            🌊 Lake Victoria / Mwanza
          </button>
          <button
            onClick={() => handleFlyTo([-7.8000, 37.8500], 11, 'Julius Nyerere Dam')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            ⚡ JNHPP Dam (2,115 MW)
          </button>
        </div>
      </div>

      {/* Main Map Canvas & Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Map Container */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative">
          {/* Map Top Status Bar */}
          <div className="bg-slate-950/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-slate-200">
                Live Geographic Canvas (Google Maps Datum -6.369028, 34.888822)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 hidden sm:inline text-[11px]">
                Click anywhere to inspect GPS coordinates
              </span>
              <a
                href={GOOGLE_MAPS_SHORTLINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 text-[11px]"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Leaflet DOM container */}
          <div
            ref={mapContainerRef}
            className="w-full h-[540px] sm:h-[620px] bg-slate-950 z-0"
          />

          {/* Interactive Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md text-white p-3 rounded-2xl border border-white/10 text-xs space-y-1.5 shadow-lg max-w-xs">
            <span className="font-bold text-[#F5E8C7] block text-[11px] uppercase tracking-wider">
              GIS Marker Legend
            </span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-white flex items-center justify-center text-[7px] text-white">★</span>
                <span>Google Center</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A3D62] border border-[#F5E8C7]" />
                <span>31 Region Capitals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rotate-45" />
                <span>Physical Wonders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                <span>Megaprojects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Ports &amp; SGR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span>User Pin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Entity Inspector Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* INSPECTOR CARD */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-[#0A3D62] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {selectedPinInfo?.category || 'Feature Inspector'}
              </span>
              <h3 className="text-xl font-black text-[#0A3D62] mt-1.5 font-display tracking-tight">
                {selectedPinInfo?.name || 'Tanzania Cartographic Feature'}
              </h3>
              {selectedPinInfo && (
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  Latitude: {selectedPinInfo.lat.toFixed(5)}° | Longitude: {selectedPinInfo.lng.toFixed(5)}°
                </p>
              )}
            </div>

            {selectedPinInfo?.metric && (
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Key Metric / Dimension
                </span>
                <span className="text-xs font-bold text-[#0A3D62]">
                  {selectedPinInfo.metric}
                </span>
              </div>
            )}

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">Geographic Profile:</span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {selectedPinInfo?.description ||
                  'Click on any marker on the map, or tap anywhere across Tanzania to inspect elevation, GPS coordinates, and administrative details.'}
              </p>
            </div>

            {/* Quick action button to Google Maps */}
            <div className="pt-2">
              <a
                href={
                  selectedPinInfo
                    ? `https://www.google.com/maps/search/?api=1&query=${selectedPinInfo.lat},${selectedPinInfo.lng}`
                    : GOOGLE_MAPS_SHORTLINK
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0A3D62] hover:bg-[#072a44] text-[#F5E8C7] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#2ECC71]" />
                <span>View Coordinates on Google Maps ↗</span>
              </a>
            </div>
          </div>

          {/* Educational Geographical Context Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Geographic Reference &amp; Cartography
              </h4>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Coordinate System:</strong> Tanzania spans between
                latitudes <strong>1°S and 12°S</strong>, and longitudes <strong>29°E and 41°E</strong>.
                The point <strong>-6.369028, 34.888822</strong> marks the national spatial center.
              </p>
              <p>
                <strong className="text-white">Cartographic Projection:</strong> World Geodetic System
                1984 (WGS 84), the global standard datum used by GPS, Google Maps, and international
                aeronautical navigation.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Source: Google Maps App Shortlink</span>
              <a
                href={GOOGLE_MAPS_SHORTLINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline flex items-center gap-1"
              >
                a8tTY5EZuYK2i6TW6 ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
