'use client';

import { Check, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type React from 'react';
import { useState } from 'react';

import LoginPage from '@/app/login/page';

// Define sports with their categories and team size limits
const SPORTS_DATA = {
  solo: [
    { name: 'Table Tennis', maxMembers: 1 },
    { name: 'Badminton', maxMembers: 1 },
    { name: 'Chess', maxMembers: 1 },
    { name: 'Carrom', maxMembers: 1 },
  ],
  group: [
    { name: 'Football', minMembers: 11, maxMembers: 15 },
    { name: 'Basketball', minMembers: 5, maxMembers: 8 },
    { name: 'Counter Strike', minMembers: 5, maxMembers: 5 },
    { name: 'PUBG Mobile', minMembers: 4, maxMembers: 4 },
  ],
};

const FACULTY_OPTIONS = ['BCA', 'CSIT'];
const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ParticipateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<Record<string, string[]>>({});
  const [savedTeams, setSavedTeams] = useState<Record<string, boolean>>({});
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(
    {}
  );
  const [activeTab, setActiveTab] = useState<'solo' | 'group'>('solo');
  const [currentEditingSport, setCurrentEditingSport] = useState<string | null>(
    null
  );

  // Check if there's a group sport that hasn't been saved yet
  const hasUnsavedGroupSport = () => {
    return selectedSports.some(
      (sport) =>
        SPORTS_DATA.group.some((s) => s.name === sport) && !savedTeams[sport]
    );
  };

  const handleSportToggle = (sport: string) => {
    // If it's a group sport and we have unsaved team members for another sport, prevent selection
    const isGroupSport = SPORTS_DATA.group.some((s) => s.name === sport);

    if (
      isGroupSport &&
      hasUnsavedGroupSport() &&
      !selectedSports.includes(sport)
    ) {
      setError(
        'Please save team members for your current sport before selecting another group sport.'
      );
      return;
    }

    setSelectedSports((prev) => {
      // If deselecting
      if (prev.includes(sport)) {
        // If it's a group sport, clean up related state
        if (isGroupSport) {
          const newTeamMembers = { ...teamMembers };
          delete newTeamMembers[sport];
          setTeamMembers(newTeamMembers);

          const newSavedTeams = { ...savedTeams };
          delete newSavedTeams[sport];
          setSavedTeams(newSavedTeams);

          const newExpandedTeams = { ...expandedTeams };
          delete newExpandedTeams[sport];
          setExpandedTeams(newExpandedTeams);
        }
        return prev.filter((s) => s !== sport);
      }
      // If selecting
      else {
        // Initialize team members for group sports
        if (isGroupSport) {
          const sportData = SPORTS_DATA.group.find((s) => s.name === sport);
          if (sportData) {
            setTeamMembers((prevTeamMembers) => ({
              ...prevTeamMembers,
              [sport]: Array(sportData.minMembers).fill(''),
            }));
            setExpandedTeams((prev) => ({ ...prev, [sport]: true }));
            setCurrentEditingSport(sport);
          }
        }
        return [...prev, sport];
      }
    });
  };

  const handleAddTeamMember = (sport: string) => {
    const sportData = SPORTS_DATA.group.find((s) => s.name === sport);
    if (sportData && teamMembers[sport].length < sportData.maxMembers) {
      setTeamMembers((prev) => ({
        ...prev,
        [sport]: [...prev[sport], ''],
      }));
    }
  };

  const handleRemoveTeamMember = (sport: string, index: number) => {
    const sportData = SPORTS_DATA.group.find((s) => s.name === sport);
    if (sportData && teamMembers[sport].length > sportData.minMembers) {
      setTeamMembers((prev) => ({
        ...prev,
        [sport]: prev[sport].filter((_, i) => i !== index),
      }));
    }
  };

  const handleTeamMemberChange = (
    sport: string,
    index: number,
    value: string
  ) => {
    setTeamMembers((prev) => ({
      ...prev,
      [sport]: prev[sport].map((member, i) => (i === index ? value : member)),
    }));
  };

  const handleSaveTeam = (sport: string) => {
    // Validate team members
    const hasEmptyMembers = teamMembers[sport].some((member) => !member.trim());
    if (hasEmptyMembers) {
      setError(`Please fill in all team member names for ${sport}`);
      return;
    }

    setSavedTeams((prev) => ({ ...prev, [sport]: true }));
    setExpandedTeams((prev) => ({ ...prev, [sport]: false }));
    setCurrentEditingSport(null);
    setError(null);
  };

  const handleEditTeam = (sport: string) => {
    setSavedTeams((prev) => ({ ...prev, [sport]: false }));
    setExpandedTeams((prev) => ({ ...prev, [sport]: true }));
    setCurrentEditingSport(sport);
  };

  const toggleTeamExpand = (sport: string) => {
    if (savedTeams[sport]) {
      setExpandedTeams((prev) => ({ ...prev, [sport]: !prev[sport] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Check if all group sports have saved teams
    if (hasUnsavedGroupSport()) {
      setError('Please save all team members before submitting');
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      semester: Number.parseInt(formData.get('semester') as string),
      faculty: formData.get('faculty') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      sports: selectedSports.map((sport) => {
        const isGroupSport = SPORTS_DATA.group.some((s) => s.name === sport);
        return {
          name: sport,
          category: isGroupSport ? 'group' : 'solo',
          teamMembers: isGroupSport ? teamMembers[sport] : [],
        };
      }),
    };

    if (selectedSports.length === 0) {
      setError('Please select at least one sport');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/sports-week/participate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      router.push('/sports-week/success');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const { data: session } = useSession();

  if (!session) {
    return <LoginPage />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Sports Week Registration
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill out the form below to participate in Sports Week events
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="faculty"
              className="block text-sm font-medium text-gray-700"
            >
              Faculty
            </label>
            <select
              id="faculty"
              name="faculty"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
            >
              <option value="">Select Faculty</option>
              {FACULTY_OPTIONS.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="semester"
              className="block text-sm font-medium text-gray-700"
            >
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
            >
              <option value="">Select Semester</option>
              {SEMESTER_OPTIONS.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select Sports
          </label>

          {/* Sports Category Tabs */}
          <div className="mb-4 flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('solo')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'solo'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Solo Sports
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('group')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'group'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Group Sports
            </button>
          </div>

          {/* Sports Selection */}
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {SPORTS_DATA[activeTab].map((sport) => (
              <div key={sport.name} className="flex items-center">
                <input
                  type="checkbox"
                  id={sport.name}
                  checked={selectedSports.includes(sport.name)}
                  onChange={() => handleSportToggle(sport.name)}
                  disabled={
                    activeTab === 'group' &&
                    !!currentEditingSport &&
                    currentEditingSport !== sport.name
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <label
                  htmlFor={sport.name}
                  className={`ml-2 text-sm ${
                    activeTab === 'group' &&
                    currentEditingSport &&
                    currentEditingSport !== sport.name
                      ? 'text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {sport.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section for Group Sports */}
        {activeTab === 'group' &&
          selectedSports.some((sport) =>
            SPORTS_DATA.group.some((s) => s.name === sport)
          ) && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Team Members
              </h3>
              {selectedSports
                .filter((sport) =>
                  SPORTS_DATA.group.some((s) => s.name === sport)
                )
                .map((sport) => {
                  const sportData = SPORTS_DATA.group.find(
                    (s) => s.name === sport
                  );
                  const isTeamSaved = savedTeams[sport];
                  const isExpanded = expandedTeams[sport];

                  return (
                    <div key={sport} className="rounded-md border p-4">
                      <div
                        className="mb-2 flex cursor-pointer items-center justify-between"
                        onClick={() => toggleTeamExpand(sport)}
                      >
                        <div className="flex items-center">
                          <h4 className="text-md font-medium">{sport}</h4>
                          {isTeamSaved && (
                            <span className="ml-2 inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              <Check className="mr-1 h-3 w-3" />
                              Team Saved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-500">
                            {sportData
                              ? `${teamMembers[sport]?.length || 0}/${sportData.maxMembers} members`
                              : ''}
                          </span>
                          {isTeamSaved &&
                            (isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ))}
                        </div>
                      </div>

                      {(!isTeamSaved || isExpanded) && (
                        <div className="mt-3 space-y-2">
                          {teamMembers[sport]?.map((member, index) => (
                            <div
                              key={index}
                              className="mb-2 flex items-center gap-2"
                            >
                              <input
                                type="text"
                                value={member}
                                onChange={(e) =>
                                  handleTeamMemberChange(
                                    sport,
                                    index,
                                    e.target.value
                                  )
                                }
                                placeholder={`Team member ${index + 1}`}
                                disabled={isTeamSaved}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm"
                              />
                              {!isTeamSaved &&
                                index >= (sportData?.minMembers || 0) && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveTeamMember(sport, index)
                                    }
                                    className="p-2 text-red-500 hover:text-red-700"
                                  >
                                    ✕
                                  </button>
                                )}
                            </div>
                          ))}

                          {!isTeamSaved &&
                            teamMembers[sport]?.length <
                              (sportData?.maxMembers || 0) && (
                              <button
                                type="button"
                                onClick={() => handleAddTeamMember(sport)}
                                className="mt-2 inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
                              >
                                + Add Team Member
                              </button>
                            )}

                          <div className="mt-4 flex justify-end">
                            {!isTeamSaved ? (
                              <button
                                type="button"
                                onClick={() => handleSaveTeam(sport)}
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                              >
                                Save Team
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleEditTeam(sport)}
                                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                              >
                                <Edit className="mr-1 h-4 w-4" />
                                Edit Team
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading || hasUnsavedGroupSport()}
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Registration'}
          </button>
          {hasUnsavedGroupSport() && (
            <p className="mt-2 text-center text-sm text-amber-600">
              Please save all team members before submitting
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
