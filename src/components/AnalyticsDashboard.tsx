import React, { useState } from 'react';
import { 
  Users, 
  MailOpen, 
  MousePointerClick, 
  TrendingUp, 
  UserPlus, 
  Download, 
  Search, 
  Filter, 
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  CheckCircle2,
  Clock,
  FileEdit,
  ArrowUpRight
} from 'lucide-react';
import { 
  INITIAL_METRICS, 
  GROWTH_CHART_DATA, 
  DEVICE_STATS, 
  TOP_LINKS, 
  PAST_CAMPAIGNS, 
  INITIAL_SUBSCRIBERS 
} from '../data/subscriberStats';
import { CampaignRecord, SubscriberRecord } from '../types/newsletter';

export const AnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(PAST_CAMPAIGNS);
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>(INITIAL_SUBSCRIBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'6m' | '30d'>('6m');
  const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubLocation, setNewSubLocation] = useState('San Francisco, US');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail) return;

    const newRecord: SubscriberRecord = {
      id: `sub-${Date.now()}`,
      email: newSubEmail,
      name: newSubName || newSubEmail.split('@')[0],
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      openCount: 0,
      location: newSubLocation,
    };

    setSubscribers([newRecord, ...subscribers]);
    setMetrics((prev) => ({
      ...prev,
      totalSubscribers: prev.totalSubscribers + 1,
    }));
    setNewSubEmail('');
    setNewSubName('');
    setIsAddSubscriberOpen(false);
    triggerToast(`Added ${newRecord.email} to subscriber list`);
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Email', 'Name', 'Status', 'JoinedDate', 'OpenCount', 'Location'];
    const rows = subscribers.map((s) => [
      s.id,
      s.email,
      `"${s.name}"`,
      s.status,
      s.joinedDate,
      s.openCount,
      `"${s.location}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mailcraft-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Exported subscribers CSV');
  };

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((camp) => {
    if (campaignFilter === 'all') return true;
    return camp.status.toLowerCase() === campaignFilter.toLowerCase();
  });

  return (
    <div className="flex-1 bg-neutral-950 text-neutral-100 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-neutral-700 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span>MailCraft Studio</span>
            <span aria-hidden="true">·</span>
            <span>Audience & Campaign Performance</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Subscriber Growth & Metrics
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddSubscriberOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Subscriber</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Subscribers */}
        <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Total Subscribers</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-nums text-white">
              {metrics.totalSubscribers.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono-nums">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="font-semibold">+{metrics.growthMonthPercent}%</span>
            <span className="text-neutral-500 font-sans ml-1">vs last month</span>
          </div>
        </div>

        {/* Average Open Rate */}
        <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Average Open Rate</span>
            <MailOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-nums text-white">
              {metrics.averageOpenRate}%
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono-nums">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="font-semibold">+{metrics.openRateChange}%</span>
            <span className="text-neutral-500 font-sans ml-1">Industry avg: 21.5%</span>
          </div>
        </div>

        {/* Click-Through Rate */}
        <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Click-Through Rate</span>
            <MousePointerClick className="w-4 h-4 text-sky-400" />
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-nums text-white">
              {metrics.averageClickRate}%
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono-nums">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="font-semibold">+{metrics.clickRateChange}%</span>
            <span className="text-neutral-500 font-sans ml-1">Industry avg: 2.8%</span>
          </div>
        </div>

        {/* Churn / Unsubscribe Rate */}
        <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Monthly Churn</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-nums text-white">
              {metrics.unsubscribeRate}%
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono-nums">
            <span className="text-emerald-400 font-semibold">Healthy</span>
            <span className="text-neutral-500 font-sans ml-1">Below 0.5% threshold</span>
          </div>
        </div>
      </div>

      {/* Main Growth Graph & Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Curve Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-neutral-100">
                Audience Growth & Deliverability
              </h2>
              <p className="text-xs text-neutral-400">
                Monthly active subscribers and open rate progression
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => setTimeRange('6m')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  timeRange === '6m' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Last 6 Months
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  timeRange === '30d' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* SVG Growth Bar / Area Graph */}
          <div className="space-y-4">
            <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-6 pt-6 px-2 border-b border-neutral-800">
              {GROWTH_CHART_DATA.map((item, idx) => {
                const maxSubs = 30000;
                const heightPercent = (item.subscribers / maxSubs) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-neutral-950 border border-neutral-700 px-2 py-1 rounded text-center font-mono-nums whitespace-nowrap shadow-lg">
                      <div className="text-white font-bold">{item.subscribers.toLocaleString()}</div>
                      <div className="text-emerald-400">{item.opens}% opens</div>
                    </div>

                    {/* Bar visual */}
                    <div className="w-full max-w-[48px] bg-neutral-800 rounded-t-lg group-hover:bg-indigo-600/80 transition-all relative overflow-hidden flex flex-col justify-end" style={{ height: `${heightPercent}%` }}>
                      <div 
                        className="w-full bg-indigo-500 rounded-t-lg"
                        style={{ height: `${(item.opens / 60) * 100}%` }}
                      />
                    </div>

                    <span className="text-xs text-neutral-400 font-mono-nums group-hover:text-white transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 px-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
                  <span>Open Rate Volume</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-neutral-800 inline-block" />
                  <span>Total List Volume</span>
                </span>
              </div>
              <span className="font-mono-nums">Target: 35,000 by Q4</span>
            </div>
          </div>
        </div>

        {/* Client Device Breakdown & Top Clicked Links */}
        <div className="space-y-6">
          {/* Device Distribution Card */}
          <div className="p-6 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-100 mb-1">
              Reading Environment
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Subscriber device client distribution
            </p>

            <div className="space-y-3.5">
              {DEVICE_STATS.map((d) => (
                <div key={d.device} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 flex items-center gap-2">
                      {d.device.includes('Desktop') ? <Laptop className="w-3.5 h-3.5 text-indigo-400" /> :
                       d.device.includes('Mobile') ? <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> :
                       <Tablet className="w-3.5 h-3.5 text-sky-400" />}
                      <span>{d.device}</span>
                    </span>
                    <span className="font-mono-nums font-bold text-white">{d.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        d.device.includes('Desktop') ? 'bg-indigo-500' :
                        d.device.includes('Mobile') ? 'bg-emerald-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Links Card */}
          <div className="p-6 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-100 mb-1">
              Top Converting Links
            </h3>
            <p className="text-xs text-neutral-400 mb-3">
              Click activity from recent dispatches
            </p>

            <div className="divide-y divide-neutral-800/80">
              {TOP_LINKS.map((link) => (
                <div key={link.url} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                  <div className="truncate max-w-[190px]">
                    <div className="text-neutral-200 font-medium truncate">{link.label}</div>
                    <div className="text-[10px] text-neutral-500 truncate">{link.url}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono-nums font-bold text-indigo-400">{link.clicks.toLocaleString()}</div>
                    <div className="text-[10px] text-neutral-400">{link.ctr} CTR</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Performance History Table */}
      <div className="p-6 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-neutral-100">
              Recent Campaign Dispatches
            </h2>
            <p className="text-xs text-neutral-400">
              Delivery telemetry and response metrics across sent issues
            </p>
          </div>

          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            {['all', 'sent', 'scheduled', 'draft'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setCampaignFilter(st)}
                className={`px-3 py-1 rounded font-medium capitalize transition-colors ${
                  campaignFilter === st ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto border border-neutral-800 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Campaign Title & Subject</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold font-mono-nums text-right">Recipients</th>
                <th className="py-3 px-4 font-semibold font-mono-nums text-right">Open Rate</th>
                <th className="py-3 px-4 font-semibold font-mono-nums text-right">Click Rate</th>
                <th className="py-3 px-4 font-semibold text-right">Dispatched</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/50">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-neutral-200">{camp.title}</div>
                    <div className="text-[11px] text-neutral-400 truncate max-w-md">{camp.subject}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                      camp.status === 'Sent' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' :
                      camp.status === 'Scheduled' ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/40' :
                      'bg-neutral-800 text-neutral-400 border border-neutral-700'
                    }`}>
                      {camp.status === 'Sent' ? <CheckCircle2 className="w-3 h-3" /> :
                       camp.status === 'Scheduled' ? <Clock className="w-3 h-3" /> :
                       <FileEdit className="w-3 h-3" />}
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono-nums text-right text-neutral-300">
                    {camp.recipients > 0 ? camp.recipients.toLocaleString() : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono-nums text-right font-medium">
                    {camp.openRate > 0 ? (
                      <span className="text-emerald-400">{camp.openRate}%</span>
                    ) : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono-nums text-right font-medium">
                    {camp.clickRate > 0 ? (
                      <span className="text-sky-400">{camp.clickRate}%</span>
                    ) : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right text-neutral-400 font-mono-nums whitespace-nowrap">
                    {camp.sentDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscriber Cohort Directory */}
      <div className="p-6 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-neutral-100">
              Subscriber Directory ({filteredSubscribers.length})
            </h2>
            <p className="text-xs text-neutral-400">
              Manage individual subscriber records, engagement history, and delivery state
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search email, name or city..."
                className="pl-8 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-indigo-500 w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="bounced">Bounced</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-neutral-800 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Subscriber</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold font-mono-nums text-right">Lifetime Opens</th>
                <th className="py-3 px-4 font-semibold text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/50">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-500">
                    No subscribers found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-neutral-100">{sub.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{sub.email}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${
                        sub.status === 'Active' ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/30' :
                        sub.status === 'Pending' ? 'bg-amber-950/70 text-amber-400 border border-amber-800/30' :
                        sub.status === 'Bounced' ? 'bg-red-950/70 text-red-400 border border-red-800/30' :
                        'bg-neutral-800 text-neutral-400'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-300">
                      {sub.location}
                    </td>
                    <td className="py-3 px-4 font-mono-nums text-right text-neutral-200 font-medium">
                      {sub.openCount}
                    </td>
                    <td className="py-3 px-4 text-right text-neutral-400 font-mono-nums">
                      {sub.joinedDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {isAddSubscriberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <h3 className="text-sm font-bold text-neutral-100">Add New Subscriber</h3>
              <button
                type="button"
                onClick={() => setIsAddSubscriberOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubscriber} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                  placeholder="subscriber@domain.com"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Location / Market</label>
                <input
                  type="text"
                  value={newSubLocation}
                  onChange={(e) => setNewSubLocation(e.target.value)}
                  placeholder="e.g. New York, US"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddSubscriberOpen(false)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                >
                  Confirm & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
