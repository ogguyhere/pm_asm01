import React, { useState, useMemo } from 'react';
import { Search, BookOpen, GitCompare, BarChart3, Bookmark, Home, ChevronRight, CheckCircle, XCircle, AlertCircle, Palette, Sun, Moon } from 'lucide-react';

const themes = {
  blue: {
    name: "Ocean Blue",
    gradient: "from-blue-600 to-cyan-600",
    primaryBtn: "bg-blue-600 hover:bg-blue-700",
    secondaryBg: "bg-blue-100 text-blue-700",
    border: "border-blue-600",
    text: "text-blue-600"
  },
  purple: {
    name: "Royal Purple",
    gradient: "from-purple-600 to-pink-600",
    primaryBtn: "bg-purple-600 hover:bg-purple-700",
    secondaryBg: "bg-purple-100 text-purple-700",
    border: "border-purple-600",
    text: "text-purple-600"
  },
  green: {
    name: "Forest Green",
    gradient: "from-green-600 to-teal-600",
    primaryBtn: "bg-green-600 hover:bg-green-700",
    secondaryBg: "bg-green-100 text-green-700",
    border: "border-green-600",
    text: "text-green-600"
  },
  orange: {
    name: "Sunset Orange",
    gradient: "from-orange-600 to-red-600",
    primaryBtn: "bg-orange-600 hover:bg-orange-700",
    secondaryBg: "bg-orange-100 text-orange-700",
    border: "border-orange-600",
    text: "text-orange-600"
  }
};

const standardsData = {
  pmbok: {
    name: "PMBOK 7th Edition",
    sections: [
      {
        id: "pmbok-285",
        title: "Risk Management",
        content: "Risk management involves identifying, analyzing, and responding to project risks. PMBOK 7 emphasizes continuous risk monitoring throughout the project lifecycle.",
        keyPoints: ["Continuous monitoring", "Risk register", "Integrated objectives", "Stakeholder tolerance"]
      },
      {
        id: "pmbok-283",
        title: "Stakeholder Engagement",
        content: "Stakeholder engagement ensures that stakeholder needs and expectations are understood and managed throughout the project. PMBOK 7 focuses on collaborative relationships.",
        keyPoints: ["Stakeholder mapping", "Engagement strategies", "Communication planning", "Expectation management"]
      },
      {
        id: "pmbok-286",
        title: "Quality Management",
        content: "Quality management integrates quality into all aspects of project work. Focus on prevention over inspection, continuous improvement, and customer satisfaction.",
        keyPoints: ["Quality planning", "Quality assurance", "Quality control", "Continuous improvement"]
      },
      {
        id: "pmbok-287",
        title: "Change Control",
        content: "Change control involves systematic processes for managing changes to project scope, schedule, and costs. Emphasizes integrated change control across all project areas.",
        keyPoints: ["Change requests", "Impact analysis", "Approval workflows", "Configuration management"]
      }
    ]
  },
  prince2: {
    name: "PRINCE2",
    sections: [
      {
        id: "prince2-risk",
        title: "Risk Management",
        content: "PRINCE2 treats risk as a theme with structured procedures. The Risk Management approach defines how risks are identified, assessed, and controlled.",
        keyPoints: ["Risk theme", "Risk appetite", "5-step process", "Regular reviews"]
      },
      {
        id: "prince2-org",
        title: "Stakeholder Engagement",
        content: "PRINCE2 addresses stakeholders through the Organization theme, defining clear roles and responsibilities. Communication Management Strategy ensures stakeholder needs are met.",
        keyPoints: ["Defined roles", "Project Board", "Communication Strategy", "Influence analysis"]
      },
      {
        id: "prince2-quality",
        title: "Quality Management",
        content: "Quality is a dedicated theme in PRINCE2. Quality Management Strategy defines quality criteria, methods, and responsibilities.",
        keyPoints: ["Quality theme", "Quality Register", "Product-based planning", "Quality review"]
      },
      {
        id: "prince2-change",
        title: "Change Control",
        content: "PRINCE2 handles change through the Change theme, with formal Issue and Change Control procedures. Configuration Management is integral to tracking changes.",
        keyPoints: ["Issue Register", "Change authority", "Configuration Records", "Impact assessment"]
      }
    ]
  },
  iso: {
    name: "ISO 21500/21502",
    sections: [
      {
        id: "iso-438",
        title: "Risk Management",
        content: "ISO standards provide a process-based approach to risk management aligned with ISO 31000. Emphasizes risk-based thinking and integration with project governance.",
        keyPoints: ["ISO 31000 alignment", "Risk-based thinking", "Governance integration", "Context establishment"]
      },
      {
        id: "iso-432",
        title: "Stakeholder Engagement",
        content: "ISO emphasizes stakeholder identification and engagement as critical processes. Focus on understanding stakeholder requirements and managing expectations systematically.",
        keyPoints: ["Stakeholder identification", "Requirements analysis", "Engagement planning", "Systematic approach"]
      },
      {
        id: "iso-436",
        title: "Quality Management",
        content: "Quality management in ISO aligns with ISO 9001 principles. Focus on meeting requirements, continuous improvement, and customer satisfaction through systematic processes.",
        keyPoints: ["ISO 9001 alignment", "Process approach", "Quality objectives", "Measurement and analysis"]
      },
      {
        id: "iso-439",
        title: "Change Control",
        content: "ISO provides structured change control processes with emphasis on documentation, approval, and communication. Changes must be evaluated against project objectives.",
        keyPoints: ["Formal process", "Documentation", "Approval gates", "Impact on objectives"]
      }
    ]
  }
};

const comparisonData = [
  {
    topic: "Risk Management",
    similarities: [
      "All three emphasize continuous risk monitoring",
      "Require formal risk identification and assessment",
      "Use risk registers or similar documentation",
      "Include stakeholder risk tolerance considerations"
    ],
    differences: [
      "PMBOK: Integrated with overall project management approach",
      "PRINCE2: Structured as a distinct theme with 5-step process",
      "ISO: Aligned with ISO 31000 risk management standard"
    ],
    unique: {
      pmbok: "Emphasizes quantitative risk analysis techniques",
      prince2: "Risk Budget and Risk Tolerance defined upfront",
      iso: "Risk-based thinking integrated into governance"
    }
  },
  {
    topic: "Stakeholder Engagement",
    similarities: [
      "Stakeholder identification is critical first step",
      "Regular communication and engagement required",
      "Expectation management emphasized",
      "Interest and influence analysis needed"
    ],
    differences: [
      "PMBOK: Focus on collaborative relationships",
      "PRINCE2: Structured through Organization theme",
      "ISO: Process-based systematic approach"
    ],
    unique: {
      pmbok: "Stakeholder engagement assessment matrix",
      prince2: "Project Board as key stakeholder governance body",
      iso: "Alignment with organizational strategic objectives"
    }
  },
  {
    topic: "Quality Management",
    similarities: [
      "Prevention over inspection philosophy",
      "Customer satisfaction as primary goal",
      "Continuous improvement emphasized",
      "Quality planning required"
    ],
    differences: [
      "PMBOK: Integrated quality approach",
      "PRINCE2: Product-based focus with Quality Register",
      "ISO: Strong alignment with ISO 9001"
    ],
    unique: {
      pmbok: "Cost of Quality analysis",
      prince2: "Quality review technique as formal method",
      iso: "Process approach to quality management"
    }
  },
  {
    topic: "Change Control",
    similarities: [
      "Formal change request process required",
      "Impact analysis before approval",
      "Documentation of all changes",
      "Authority levels for approvals"
    ],
    differences: [
      "PMBOK: Integrated Change Control",
      "PRINCE2: Change theme with Issue Register",
      "ISO: Process-based with governance emphasis"
    ],
    unique: {
      pmbok: "Configuration management system",
      prince2: "Configuration Item Records tracking",
      iso: "Evaluation against project objectives"
    }
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('pmbok');
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = themes[currentTheme];
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryText = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    
    Object.entries(standardsData).forEach(([key, standard]) => {
      standard.sections.forEach(section => {
        if (section.title.toLowerCase().includes(query) || 
            section.content.toLowerCase().includes(query)) {
          results.push({ ...section, standard: key, standardName: standard.name });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const HomePage = () => (
    <div className="space-y-8">
      <div className={`text-center py-12 bg-gradient-to-r ${theme.gradient} text-white rounded-lg shadow-xl`}>
        <h1 className="text-5xl font-bold mb-4">PM Standards Hub</h1>
        <p className="text-xl mb-6">Compare PMBOK, PRINCE2, and ISO 21500/21502</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setCurrentPage('library')}
            className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Explore Standards
          </button>
          <button 
            onClick={() => setCurrentPage('compare')}
            className="bg-gray-800 bg-opacity-30 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-all"
          >
            Compare Now
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 ${theme.border} transform hover:scale-105 transition-transform`}>
          <BookOpen className={`w-12 h-12 ${theme.text} mb-4`} />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Standards Library</h3>
          <p className={secondaryText}>Browse and search through PMBOK 7, PRINCE2, and ISO standards.</p>
        </div>
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 border-purple-500 transform hover:scale-105 transition-transform`}>
          <GitCompare className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Comparison Engine</h3>
          <p className={secondaryText}>Side-by-side topic comparisons with detailed insights.</p>
        </div>
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 border-green-500 transform hover:scale-105 transition-transform`}>
          <BarChart3 className="w-12 h-12 text-green-500 mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Insights Dashboard</h3>
          <p className={secondaryText}>Visual analytics and coverage matrix.</p>
        </div>
      </div>

      <div className={`${cardBg} p-8 rounded-lg shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Project WBS Overview</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>1.0 Project Initiation</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>1.1 Requirements Analysis</div>
            <div>1.2 Technology Stack Selection</div>
            <div>1.3 Project Setup</div>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>2.0 Standards Repository</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>2.1 Data Structure Design</div>
            <div>2.2 Search Implementation</div>
            <div>2.3 Navigation System</div>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>3.0 Comparison Engine</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>3.1 Comparison Logic</div>
            <div>3.2 Deep Linking System</div>
            <div>3.3 Side-by-Side View</div>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>4.0 Insights Dashboard</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>4.1 Analytics Engine</div>
            <div>4.2 Visualization Components</div>
            <div>4.3 Summary Reports</div>
          </div>
        </div>
      </div>
    </div>
  );

  const LibraryPage = () => {
    const standard = standardsData[selectedStandard];
    
    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Standards Library</h2>
          
          <div className="mb-6">
            <div className="relative">
              <Search className={`absolute left-3 top-3 w-5 h-5 ${secondaryText}`} />
              <input
                type="text"
                placeholder="Search across all standards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className={`font-semibold ${textColor}`}>Search Results:</h3>
                {searchResults.map((result) => (
                  <div key={result.id} className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-sm font-semibold ${theme.text}`}>{result.standardName}</span>
                        <h4 className={`font-semibold ${textColor}`}>{result.title}</h4>
                        <p className={`text-sm ${secondaryText}`}>{result.content.substring(0, 100)}...</p>
                      </div>
                      <button
                        onClick={() => toggleBookmark(result.id)}
                        className={bookmarks.includes(result.id) ? 'text-yellow-500' : 'text-gray-400'}
                      >
                        <Bookmark className="w-5 h-5" fill={bookmarks.includes(result.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {Object.entries(standardsData).map(([key, std]) => (
              <button
                key={key}
                onClick={() => setSelectedStandard(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedStandard === key
                    ? `${theme.primaryBtn} text-white shadow-lg`
                    : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`
                }`}
              >
                {std.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {standard.sections.map((section) => (
              <div key={section.id} className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className={`text-sm ${secondaryText}`}>{section.id}</span>
                    <h3 className={`text-xl font-bold ${textColor}`}>{section.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleBookmark(section.id)}
                    className={bookmarks.includes(section.id) ? 'text-yellow-500' : 'text-gray-400'}
                  >
                    <Bookmark className="w-5 h-5" fill={bookmarks.includes(section.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <p className={`${secondaryText} mb-3`}>{section.content}</p>
                <div className="flex flex-wrap gap-2">
                  {section.keyPoints.map((point, idx) => (
                    <span key={idx} className={`px-3 py-1 ${theme.secondaryBg} rounded-full text-sm`}>
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ComparePage = () => {
    const comparison = comparisonData[selectedTopic];
    
    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Standards Comparison</h2>
          
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Select Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(Number(e.target.value))}
              className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              {comparisonData.map((item, idx) => (
                <option key={idx} value={idx}>{item.topic}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg border-l-4 border-blue-600 ${isDarkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'}`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>PMBOK 7</h3>
              <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                {standardsData.pmbok.sections.find(s => s.title === comparison.topic)?.content}
              </p>
              <a href={`#${standardsData.pmbok.sections.find(s => s.title === comparison.topic)?.id}`} 
                 className="text-blue-600 text-sm font-semibold mt-2 inline-flex items-center hover:underline">
                View Full Section <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className={`p-4 rounded-lg border-l-4 border-purple-600 ${isDarkMode ? 'bg-purple-900 bg-opacity-30' : 'bg-purple-50'}`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>PRINCE2</h3>
              <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                {standardsData.prince2.sections.find(s => s.title === comparison.topic)?.content}
              </p>
              <a href={`#${standardsData.prince2.sections.find(s => s.title === comparison.topic)?.id}`} 
                 className="text-purple-600 text-sm font-semibold mt-2 inline-flex items-center hover:underline">
                View Full Section <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className={`p-4 rounded-lg border-l-4 border-green-600 ${isDarkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'}`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>ISO 21500</h3>
              <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                {standardsData.iso.sections.find(s => s.title === comparison.topic)?.content}
              </p>
              <a href={`#${standardsData.iso.sections.find(s => s.title === comparison.topic)?.id}`} 
                 className="text-green-600 text-sm font-semibold mt-2 inline-flex items-center hover:underline">
                View Full Section <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className={`font-bold ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>Similarities</h3>
              </div>
              <ul className="space-y-1">
                {comparison.similarities.map((item, idx) => (
                  <li key={idx} className={isDarkMode ? 'text-green-200' : 'text-green-800'}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${isDarkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className={`font-bold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>Key Differences</h3>
              </div>
              <ul className="space-y-1">
                {comparison.differences.map((item, idx) => (
                  <li key={idx} className={isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-blue-600" />
                <h3 className={`font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>Unique Aspects</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>PMBOK:</span>
                  <span className={`ml-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>{comparison.unique.pmbok}</span>
                </div>
                <div>
                  <span className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>PRINCE2:</span>
                  <span className={`ml-2 ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>{comparison.unique.prince2}</span>
                </div>
                <div>
                  <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>ISO:</span>
                  <span className={`ml-2 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>{comparison.unique.iso}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => {
    const stats = {
      totalTopics: 4,
      similarities: comparisonData.reduce((acc, c) => acc + c.similarities.length, 0),
      differences: comparisonData.reduce((acc, c) => acc + c.differences.length, 0),
      bookmarked: bookmarks.length
    };

    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Insights Dashboard</h2>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-100'}`}>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stats.totalTopics}</div>
              <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>Topics Analyzed</div>
            </div>
            <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-100'}`}>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{stats.similarities}</div>
              <div className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>Common Practices</div>
            </div>
            <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-yellow-900 bg-opacity-30' : 'bg-yellow-100'}`}>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats.differences}</div>
              <div className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>Key Differences</div>
            </div>
            <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-purple-900 bg-opacity-30' : 'bg-purple-100'}`}>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{stats.bookmarked}</div>
              <div className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Bookmarked Items</div>
            </div>
          </div>

          <div className={`p-6 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Topic Coverage Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className={`text-left p-2 ${textColor}`}>Topic</th>
                    <th className={`text-center p-2 ${textColor}`}>PMBOK</th>
                    <th className={`text-center p-2 ${textColor}`}>PRINCE2</th>
                    <th className={`text-center p-2 ${textColor}`}>ISO</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, idx) => (
                    <tr key={idx} className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <td className={`p-2 font-semibold ${textColor}`}>{item.topic}</td>
                      <td className="text-center p-2">
                        <CheckCircle className="w-5 h-5 text-green-500 inline" />
                      </td>
                      <td className="text-center p-2">
                        <CheckCircle className="w-5 h-5 text-green-500 inline" />
                      </td>
                      <td className="text-center p-2">
                        <CheckCircle className="w-5 h-5 text-green-500 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Key Findings</h3>
            <div className="space-y-3">
              <div className={`p-3 ${cardBg} rounded border-l-4 border-green-500`}>
                <p className={secondaryText}>
                  <span className={`font-semibold ${textColor}`}>High Alignment:</span> All three standards emphasize continuous monitoring, stakeholder engagement, and formal documentation processes.
                </p>
              </div>
              <div className={`p-3 ${cardBg} rounded border-l-4 border-yellow-500`}>
                <p className={secondaryText}>
                  <span className={`font-semibold ${textColor}`}>Methodological Differences:</span> PRINCE2 uses theme-based approach, PMBOK focuses on integration, ISO emphasizes process alignment.
                </p>
              </div>
              <div className={`p-3 ${cardBg} rounded border-l-4 border-blue-500`}>
                <p className={secondaryText}>
                  <span className={`font-semibold ${textColor}`}>Best Practice:</span> Organizations should consider hybrid approaches based on project context and organizational maturity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <nav className={`${cardBg} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-8 h-8 ${theme.text}`} />
              <span className={`text-xl font-bold ${textColor}`}>PM Standards Hub</span>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'home' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('library')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'library' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Library</span>
              </button>
              <button
                onClick={() => setCurrentPage('compare')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'compare' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                <GitCompare className="w-5 h-5" />
                <span className="hidden sm:inline">Compare</span>
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'dashboard' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Palette className="w-5 h-5" />
                </button>
                
                {showThemeSelector && (
                  <div className={`absolute right-0 mt-2 w-48 ${cardBg} rounded-lg shadow-xl border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} z-50`}>
                    <div className="p-2">
                      <div className={`text-xs font-semibold ${secondaryText} px-2 py-1`}>Choose Theme</div>
                      {Object.entries(themes).map(([key, t]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setCurrentTheme(key);
                            setShowThemeSelector(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded ${textColor} hover:bg-opacity-10 transition-all flex items-center justify-between`}
                        >
                          <span>{t.name}</span>
                          {currentTheme === key && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'compare' && <ComparePage />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
    </div>
  );
};

export default App;